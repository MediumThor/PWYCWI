import React from 'react';

class YouTubeVideo extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            window.onYouTubeIframeAPIReady = this.loadVideo;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            this.loadVideo();
        }
    }

    loadVideo = () => {
        const { id } = this.props;

        this.player = new window.YT.Player(`youtube-player-${id}`, {
            videoId: id,
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                fs: 0,
                cc_load_policty: 0,
                iv_load_policy: 3,
                autohide: 0
            },
            events: {
                'onReady': this.onPlayerReady,
            }
        });
    }

    onPlayerReady = (event) => {
        this.playVideo = () => {
            event.target.playVideo();
        };

        this.pauseVideo = () => {
            event.target.pauseVideo();
        };
    }

    render() {
        const { id } = this.props;

        return (
            <div id={`youtube-player-${id}`} ref={this.myRef} />
        );
    }
}

export default React.forwardRef((props, ref) => <YouTubeVideo ref={ref} {...props} />);
