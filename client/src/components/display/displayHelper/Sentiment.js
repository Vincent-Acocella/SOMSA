import React from 'react'
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class Sentiment extends React.Component {
  state = {
    dataPie: {
      labels: ["Decrease", "Positive"],
      datasets: [
        {
          data: [60, 40],
          backgroundColor: [
            "#F7464A",
            "#46BFBD"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1"
          ]
        }
      ]
    }
  }

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">Sentiment</h3>
        <Pie data={this.state.dataPie} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default Sentiment;