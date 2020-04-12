import React from 'react';
import Header from './components/Header.js';
import ec2url from './EC2Link';


class IndividualAstronaut extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            temp: null,
            image: null
        }
    }

    getAstronautImage = () =>{
        let url = '';

        if(process.env.NODE_ENV === 'production'){
            url = ec2url + this.props.match.params.type + '/:' + this.props.match.params.astronautId + '/:' + this.props.match.params.type;
        }
        else{
            url = '/' + this.props.match.params.type + '/' + this.props.match.params.astronautId + '/' + this.props.match.params.type;
        }
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            // console.log(data['thumbnail']['source']);
            if(data['title'] !== 'Not found.'){
                this.setState({image: data['thumbnail']['source']});
            }
            // this.setState({image: data['thumbnail']['source']});
        });
    }

    componentDidMount(){
        this.setState({temp: this.props.match.params.astronautId});
        console.log(this.props.match.params);
        this.getAstronautImage();
    }

    render(){
        return(
            <div>
                <Header />
                <p>{this.state.temp}</p>
                <img src={this.state.image} />
            </div>
        )
    }
    
}

export default IndividualAstronaut;