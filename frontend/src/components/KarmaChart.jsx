import React from 'react';
import ReactEcharts from 'echarts-for-react';
class KarmaChart extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        selectedKarma: [this.props.subredditData[0]],
        time: [this.props.time]
      };
      // this.parseData = this.parseData.bind(this);
      this.getOptions = this.getOptions.bind(this);
      // This binding is necessary to make `this` work in the callback
    }
  
    // parseData() {
    //   console.log(this.props.subredditData);
      
    // }
  
    getOptions() {
      let option = {
          title: {
              text: this.props.subredditData[0] + " Karma Tracker",
              textStyle: { color: 'black' },
              x: 'center',
              y: 'top'
          },
          xAxis: {
              type: 'category',
              name: 'Time in Seconds',
              data: this.state.time,
              axisLabel: {
                  textStyle: { color: 'black' }
              }
          },
          yAxis: {
              type: 'value',
              name: 'Karma',
              axisLabel: {
                  textStyle: { color: 'black' }
              }
          },
          series: [],
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          toolbox: {
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  magicType: { show: true, type: ['line', 'bar'] },
                  restore: { show: true },
                  saveAsImage: { show: true }
              }
          }
      };
      option.series.push({ data: this.state.selectedKarma, type: 'line' });

      return option;
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps !== this.props && prevProps.time !== this.props.time) {
        let karma;
        let time;
        if (this.state.selectedKarma === null && this.state.time === null) {
          karma = [this.props.subredditData[1].total];
          time = [this.props.time];
        } else {
          karma = [...this.state.selectedKarma, this.props.subredditData[1].total];
          time = [...this.state.time, this.props.time];
        }

        this.setState({
          selectedKarma: karma,
          time: time
        });
      }
    }
  
  
    render(){  
  
      return(

        <ReactEcharts option={this.getOptions()} style={{ height: '100%', width: '100%' }} />

      );
    }
  }
  
  export default KarmaChart;