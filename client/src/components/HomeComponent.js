import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { caraouselItems } from '../shared/caraousel'
import { FetchCaraousels } from '../redux/caraousels/caraouselsActionCreator'
import { Loading } from './LoadingComponent';
import SocietiesComponent from './SocietiesComponent'

const mapStateToProps = state => {
  return {
   caraousels : state.caraousels
  }
}


const mapDispatchToProps = (dispatch) => ({
  fetchCaraousels: () => {dispatch(FetchCaraousels())},
});


var temp_len = 0;

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount() {
    this.props.fetchCaraousels();
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === temp_len - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? temp_len - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    var display;
    if(this.props.caraousels.isLoading)
    {
      display = <div>
        <Loading/>
      </div>
    }
    else if(this.props.caraousels.err)
    {
      display = <div>
        {this.props.caraousels.err}
      </div>
    }
    else
    {
      temp_len = this.props.caraousels.payload.length
      const slides = this.props.caraousels.payload.map((item) => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.altText}
          >
            <img src={item.image} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
          </CarouselItem>
        );
      });
  

      display = <div>
      <Carousel
      activeIndex={activeIndex}
      next={this.next}
      previous={this.previous}
    >
      <CarouselIndicators items={this.props.caraousels.payload} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
    </Carousel>
    </div>
    }
    
    return (
      <div>
         {display}
         <SocietiesComponent/>
      </div>
     
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent));