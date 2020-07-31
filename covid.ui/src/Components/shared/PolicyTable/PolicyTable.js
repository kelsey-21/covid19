import React from 'react';
import { Table } from 'reactstrap';

import PolicyData from '../../../helpers/data/PolicyData';

import './PolicyTable.scss';

class PolicyTable extends React.Component {
  state = {
    policies: []
  }

  componentDidMount() {
    const { locationCode } = this.props;
    PolicyData.getPolicies(locationCode)
      .then(policies => this.setState({ policies: policies }))
  }


  render() {
    const { policies } = this.state;
    var row = policies.map(policy => <tr key={policy.locationPolicyId+policy.policyStatus}>
        <th scope="row"></th>
        <td>{policy.policyStatus}</td>
    <td>{policy.date}</td>
    <td>{policy.policyName}</td>
      </tr>
    )
    return (
      <div className="PolicyTable">
        <Table hover>
          <thead>
            <tr>
              <th></th>
              <th>Policy Status</th>
              <th>Date of Change</th>
              <th>Policy</th>
            </tr>
          </thead>
          <tbody>
            {row}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default PolicyTable;
