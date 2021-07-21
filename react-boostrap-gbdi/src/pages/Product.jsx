import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Image, Spinner, Table } from "react-bootstrap";
import { format } from "date-fns";
import { Alert } from "bootstrap";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef();

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        "https://api.codingthailand.com/api/course",
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setProduct(resp.data.data);
      // console.log(resp.data.data);
    } catch (error) {
      // NOTE: if axios request is cancelled by CancelTokenSource.cancel(),
      // isCancel(error) will be true
      if (!axios.isCancel(error)) setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData();
    return () => {
      cancelToken.current.cancel();
      console.log("Exit Product page");
    };
  }, []);

  if (loading === true) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading ...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h1>HTTP Request Error</h1>
        <Alert>
          <p>{error.response.data.message}</p>
          <p>{error.response.data.message}</p>
        </Alert>
      </div>
    );
  }

  return (
    <main className="container">
      <div className="bg-light p-5 rounded">
        <h1>Product Page</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cover</th>
              <th>Name</th>
              <th>Detail</th>
              <th>Created At</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <Image
                    className="product-picture"
                    src={item.picture}
                    rounded
                    alt="item-picture"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.detail}</td>
                <td>{format(new Date(item.date), "dd MMM yyyy")}</td>
                <td>{item.view}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
};

export default Product;
