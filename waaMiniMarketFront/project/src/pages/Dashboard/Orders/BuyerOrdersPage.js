import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../layouts/Styles/SiteStyles.css';
import Header from '../../../layouts/Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const BuyerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/buyers/orders?buyerId=${JSON.parse(Cookies.get('user')).id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders. Please try again later.');
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (id) => {
    try {
      await axios.put(`http://localhost:8081/api/buyers/orders/${id}/cancel`, { orderStatus: 'CANCELLED' }, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, orderStatus: 'CANCELLED' } : order
        )
      );
    } catch (error) {
      console.error(error.message);
      setError('Failed to update order status to CANCELLED.');
    }
  };

  if (Cookies.get('role') !== 'BUYER') {
    navigate('/');
    return <>Redirecting...</>;
  }

  return (
    <>
      <Header />

      <div className="container">
        <h3>Order History</h3>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>

      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-10 table-responsive mb-5">
            <table className="table table-bordered text-center mb-0">
              <thead className="bg-secondary text-dark">
                <tr>
                  <th>Order Number</th>
                  <th>Price</th>
                  <th>Total Products</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td className="align-middle">{order.id}</td>
                    <td className="align-middle">${order.totalPrice}</td>
                    <td className="align-middle">
                      {order.orderItems?.reduce((acc, orderItem) => acc + orderItem.quantity, 0)}
                    </td>
                    <td className="align-middle">{order.orderStatus}</td>
                    <td className="align-middle">
                      {order.orderStatus === 'PENDING' ? (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel Order
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-primary" disabled>
                          Cancel Order
                        </button>
                      )}
                      <Link to={`/buyer/orders/${order.id}`}>
                        <button className="btn btn-sm btn-primary m-1">Details</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerOrdersPage;
