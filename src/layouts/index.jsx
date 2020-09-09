import React, { Component } from "react";
import { connect } from "react-redux";
import PrimaryLayout from "./PrimaryLayout";
import PublicLayout from "./PublicLayout";
import { Authorized } from "../components/Authorized";

@connect((state) => ({ token: state.token }))
class BasicLayout extends Component {
  render() {
    const { token } = this.props;
    if (token) {
      return (
        <Authorized
          render={(routes) => {
            return <PrimaryLayout routes={routes} />;
          }}
        />
      );
    }

    return <PublicLayout />;
  }
}

export default BasicLayout;
