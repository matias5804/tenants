import React, { useEffect, useState } from 'react';
import { Service } from './Service';

function App() {
  
  const [currentTenants, setCurrentTenants] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [tabActive, setTabActive] = useState([1])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let data = await Service.getTenants();
    setCurrentTenants(data);
    setTenants(data);
  };

  const monthDiff = (d1, d2) => {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };

  const all = () => {
    setCurrentTenants(tenants);
    setTabActive(1);
  }

  const paymentLate = (e) => {
    e.preventDefault();
    let data = tenants.filter((item) => item.paymentStatus === "LATE");
    setCurrentTenants(data);
    setTabActive(2);
  };

  const lessThenMonths = (e) => {
    e.preventDefault();
    let actualDate = new Date();
    let data = tenants.filter((item) => {
      let itemDate = new Date(item.leaseEndDate);
      return monthDiff(itemDate, actualDate) <= 1;
    });
    setCurrentTenants(data);
    setTabActive(3);
  };

  const orderById = () => {
    let data = tenants.sort((a, b) => a.id - b.id);
    setCurrentTenants([...data]);
  };

  const orderByName = () => {
    let data = tenants;
    data = data.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
    setCurrentTenants([...data]);
  };

  const orderByStatus = () => {
    let data = tenants;
    data = data.sort((a, b) =>
      a.paymentStatus.toLowerCase() > b.paymentStatus.toLowerCase() ? 1 : -1
    );
    setCurrentTenants([...data]);
  };

  const orderDate = () => {
    let data = tenants.sort((a, b) => {
      return new Date(b.leaseEndDate) - new Date(a.leaseEndDate);
    });
    setCurrentTenants([...data]);
  };

  const deleteTenant = async (ternantId) => {
    try {
      let data = tenants.filter((item) => item.id !== ternantId);
      await Service.deleteTenant(ternantId);
      setTenants([...data]);
      setCurrentTenants([...data]);
    }catch(err) {
      alert(err)
    }
  };

  return (
      <>
        <div className="container">
        <h1>Tenants</h1>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={(tabActive == 1) ? "nav-link active" : "nav-link"} href="#" onClick={all}>
              All
            </a>
          </li>
          <li className="nav-item">
            <a className={(tabActive == 2) ? "nav-link active" : "nav-link"} href="#" onClick={paymentLate}>
              Payment is late
            </a>
          </li>
          <li className="nav-item">
            <a className={(tabActive == 3) ? "nav-link active" : "nav-link"} href="#" onClick={lessThenMonths}>
              Lease ends in less than a month
            </a>
          </li>
        </ul>

          <table className="table">
          <thead>
            <tr>
              <th onClick={orderById} >#</th>
              <th onClick={orderByName}>Name</th>
              <th onClick={orderByStatus} >Payment Status</th>
              <th onClick={orderDate} >Lease End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
            <tbody>
            {currentTenants.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.paymentStatus}</td>
                <td>{item.leaseEndDate}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTenant(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          
            </tbody>
          </table>
        </div>
        <div className="container">
          <button className="btn btn-secondary">Add Tenant</button>
        </div>
        <div className="container">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input className="form-control"/>
            </div>
            <div className="form-group">
              <label>Payment Status</label>
              <select className="form-control">
                <option>CURRENT</option>
                <option>LATE</option>
              </select>
            </div>
            <div className="form-group">
              <label>Lease End Date</label>
              <input className="form-control"/>
            </div>
            <button className="btn btn-primary">Save</button>
            <button className="btn">Cancel</button>
          </form>
        </div>
      </>
  );
}

export default App;
