import React, { Component } from "react";
import Layout from "../components/Layout.js";
import BootstrapTable from "react-bootstrap-table-next";
import { TwitterTweetEmbed } from "react-twitter-embed";

import("../node_modules/bootstrap/scss/bootstrap.scss");

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: props.tweets
    };
  }
  render() {
    const embedFormatter = (cell, row, rowIndex, formatExtraData) => {
      return <TwitterTweetEmbed tweetId={cell} />;
    };
    const columns = [
      {
        text: "Date",
        dataField: "created_at",
        sort: true
      },
      {
        text: "Favourite",
        dataField: "favourite_count",
        sort: true
      },
      {
        text: "Embed",
        formatter: embedFormatter,
        dataField: "id_str"
      }
    ];
    const defaultSorted = [
      {
        dataField: "created_at",
        order: "desc"
      }
    ];

    return (
      <Layout>
        <h1>Home Timeline</h1>
        <BootstrapTable
          bootstrap4
          keyField="created_at"
          data={this.state.tweets}
          columns={columns}
          defaultSorted={defaultSorted}
        />
      </Layout>
    );
  }
}
export default Grid;
