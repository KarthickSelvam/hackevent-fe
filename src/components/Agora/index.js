import React, { Component } from 'react';
import AgoraRTC from 'agora-rtc-sdk';

const USER_ID = Math.floor(Math.random() * 1000000001);
let client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });

class Call extends Component {
  state = {
    remoteStreams: {}
  };

  localStream = AgoraRTC.createStream({
    streamID: USER_ID,
    audio: true,
    video: true,
    screen: false
  });

  componentDidMount() {
    this.initLocalStream();
    this.initClient();
  }

  initClient = () => {
    client.init(
      'e09b9a2354e14167aadfa4280047d951',
      function() {
        console.log('AgoraRTC client initialized');
      },
      function(err) {
        console.log('AgoraRTC client init failed', err);
      }
    );
    this.subscribeToClient();
  };

  initLocalStream = () => {
    let me = this;
    me.localStream.init(
      function() {
        console.log('getUserMedia successfully');
        me.localStream.play('agora_local');
        me.joinChannel();

        window.startSpeechRecoginition();
      },
      function(err) {
        console.log('getUserMedia failed', err);
      }
    );
    console.log(me.localStream.getAudioTrack());
  };

  joinChannel = () => {
    let me = this;
    client.join(
      null,
      me.props.channel,
      USER_ID,
      function(uid) {
        console.log('User ' + uid + ' join channel successfully');
        client.publish(me.localStream, function(err) {
          console.log('Publish local stream error: ' + err);
        });

        client.on('stream-published', function(evt) {
          console.log('Publish local stream successfully');
        });
      },
      function(err) {
        console.log('Join channel failed', err);
      }
    );
  };

  subscribeToClient = () => {
    let me = this;
    client.on('stream-added', me.onStreamAdded);
    client.on('stream-subscribed', me.onRemoteClientAdded);
    client.on('stream-removed', me.onStreamRemoved);
    client.on('peer-leave', me.onPeerLeave);
  };

  onStreamAdded = evt => {
    let me = this;
    let stream = evt.stream;
    console.log('New stream added: ' + stream.getId());
    console.log(stream.getAudioTrack());

    me.setState(
      {
        remoteStreams: {
          ...me.state.remoteStream,
          [stream.getId()]: stream
        }
      },
      () => {
        // Subscribe after new remoteStreams state set to make sure
        // new stream dom el has been rendered for agora.io sdk to pick up
        client.subscribe(stream, function(err) {
          console.log('Subscribe stream failed', err);
        });
      }
    );
  };

  onRemoteClientAdded = evt => {
    let me = this;
    let remoteStream = evt.stream;
    console.log(remoteStream);
    me.state.remoteStreams[remoteStream.getId()].play(
      'agora_remote ' + remoteStream.getId()
    );
  };

  onStreamRemoved = evt => {
    let me = this;
    let stream = evt.stream;
    if (stream) {
      let streamId = stream.getId();
      let { remoteStreams } = me.state;

      stream.stop();

      delete remoteStreams[streamId];
      me.setState({ remoteStreams });
      console.log('Remote stream is removed ' + stream.getId());
    }
  };

  onPeerLeave = evt => {
    let me = this;
    let stream = evt.stream;
    if (stream) {
      let streamId = stream.getId();
      let { remoteStreams } = me.state;

      stream.stop();

      delete remoteStreams[streamId];
      me.setState({ remoteStreams });
      console.log('Remote stream is removed ' + stream.getId());
    }
  };

  render() {
    return (
      <div>
        <div id="agora_local" style={{ width: '100%', height: '100vh' }} />
        {Object.keys(this.state.remoteStreams).map(key => {
          let stream = this.state.remoteStreams[key];
          let streamId = stream.getId();
          return (
            <div
              key={streamId}
              id={`agora_remote ${streamId}`}
              style={{
                width: '100px',
                height: '100px',
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                zIndex: 1000,
                border: '#fff solid',
                borderRadius: '5px'
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default Call;
