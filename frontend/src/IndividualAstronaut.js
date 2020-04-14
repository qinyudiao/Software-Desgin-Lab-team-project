import React from 'react';
import Header from './components/Header.js';
import ec2url from './EC2Link';


class IndividualAstronaut extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image: null,
            information: null,
            showInformation: false
        }
    }

    getAstronautInfo = () =>{
        let url = '';

        if(process.env.NODE_ENV === 'production'){
            url = ec2url + this.props.match.params.type + '/' + this.props.match.params.astronautId + '/' + this.props.match.params.type;
        }
        else{
            url = '/' + this.props.match.params.type + '/' + this.props.match.params.astronautId + '/' + this.props.match.params.type;
        }
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            if(data['title'] !== 'Not found.'){
                if(data['thumbnail']){
                    this.setState({image: data['thumbnail']['source']});
                }
                this.setState({information: data});
                this.setState({showInformation: true});
            }
        });
    }

    componentDidMount(){
        console.log(this.props.match.params);
        this.getAstronautInfo();
    }

    render(){
        return(
            <div>
                <Header />
                <img src={this.state.image} />
                {this.state.showInformation ? this.state.information.title : null}
                {this.state.showInformation ? this.state.information.extract : null}
                {this.state.showInformation ? <a href={this.state.information.content_urls.desktop.page}>See more information</a> : null}
            </div>
        )
    }
    
}

export default IndividualAstronaut;