import React, { Component } from 'react';
import './App.css';
import birds from './birds.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import BirdCard from './components/BirdCard'

class App extends Component {
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        birds: birds,
        unselectedBirds: birds
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectBird = breed => {
        const findBird = this.state.unselectedBirds.find(item => item.breed === breed);

        if(findBird === undefined) {
            // failure to select a new dog
            this.setState({ 
                message: "You guessed incorrectly!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                birds: birds,
                unselectedBirds: birds
            });
        }
        else {
            // success to select a new dog
            const newBird = this.state.unselectedBirds.filter(item => item.breed !== breed);
            
            this.setState({ 
                message: "You guessed correctly!",
                curScore: this.state.curScore + 1,
                birds: birds,
                unselectedBirds: newBird
            });
        }

        this.shuffleArray(birds);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.birds.map(bird => (
                        <BirdCard
                            breed={bird.breed}
                            image={bird.image}
                            selectBird={this.selectBird} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;