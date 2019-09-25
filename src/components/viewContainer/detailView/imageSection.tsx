import React, { Component } from 'react';
import Axios, { AxiosResponse } from 'axios';
import ImageCard, { ImageUrls } from './imageCard';
import { ThemedCSSProperties, ThemeContext } from '../../../contexts/themeContext';

interface Props {
    view: string
}

interface State {
    imagesUrls: ImageUrls[]
    isLoading: boolean
    likedImages: ImageUrls[]
    isLiked: boolean
}

export default class ImageSection extends Component<Props, State> {
    /** Not a good place for the key.. well.. what the heck.. - GET YOUR OWN! */
    readonly accessKey = "635745df97a8ae28d16ce955899eefc2ddc69fbaa7348f4b909f47a414d4e8c1"
    readonly imageDatabaseApiUrl = "https://api.unsplash.com/search/photos/"

    state: State = {
        imagesUrls: new Array().fill({}),
        isLoading: true,
        likedImages: [],
        isLiked: true 
    }
    //Getting data from the localStorage.
    handleLikedImage() {
        const data: ImageUrls[] = JSON.parse(localStorage.getItem(this.props.view) || "{}")

        if(data.length > 0) {
            this.setState ({
                likedImages: this.state.likedImages = [...data]
            });
        }
    }
    //Converting JavaScript values to JSON file.
    localStorage() {
        localStorage.setItem(this.props.view, JSON.stringify(this.state.likedImages))
    }
    //It will run whenever this.setState() is called.
    componentDidUpdate() {
        if(this.props.view in localStorage && this.state.likedImages.length === 0) {
            this.handleLikedImage();

        } else {
            this.localStorage(); 
        }
    }
    //Saving the liked images.
    likedImages = (url: ImageUrls, index: number) => {
        this.setState({
            likedImages: [...this.state.likedImages, url]
        });
        this.setState({
            imagesUrls: this.state.imagesUrls.filter((_, i) => i !== index)
        });
    }

    handleResponse(response: AxiosResponse) {
        if (response.data && response.data.results) {
            const images = response.data.results.map((img: any) => img.urls)
            this.setState({ imagesUrls: images, isLoading: false })
        }
    }

    async componentDidMount() {
        try {
            const response = await Axios.get(this.imageDatabaseApiUrl, {
                params: {
                    client_id: this.accessKey,
                    query: this.props.view,
                    page: Math.round(Math.random() * 100),
                    per_page: 24,
                }
            })
            this.handleResponse(response);
        } catch(error) {
            console.error(error)
        }
    }

   render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div style={root(theme)}>
                        {this.state.likedImages.map((urls, index) =>
                            <ImageCard likedClick={this.likedImages} 
                            isLiked={true} view= {this.props.view} key={index} urls={urls} 
                            index={index}/>
                        )}
                        {this.state.imagesUrls.map((urls, index) =>
                            <ImageCard likedClick={this.likedImages} 
                            isLiked={false} view= {this.props.view} key={index} urls={urls} 
                            index={index}/>
                        )}
                    </div>
                )}
            </ThemeContext.Consumer>
        )
    }
}

const root: ThemedCSSProperties = (theme) => ({
    margin: '3em -1em -1em -1em',
    display: 'flex',
    flexWrap: 'wrap',
    background: `${theme.background.primary}B3`,
    boxShadow: `0 0px 80px 15px ${theme.background.primary}`
})