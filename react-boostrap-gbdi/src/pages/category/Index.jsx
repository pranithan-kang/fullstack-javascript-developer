import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Image, Spinner, Table, Button } from "react-bootstrap";
import { GiPencil, GiTrashCan } from "react-icons/gi";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import HttpError from "../../components/HttpError";

const Index = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef();
  const history = useHistory();

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        "https://api.codingthailand.com/api/category",
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setCategory(resp.data);
      // console.log(resp.data);
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
      console.log("Exit Category page");
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
    return <HttpError message={error.response.data.message} />;
  }

  const createCategory = (event) => {
    history.push("/category/create");
  };

  const editCategory = ({ id }) => {
    history.push(`/category/edit/${id}`);
  };

  const deleteCategory = async ({ id, name }) => {
    const isConfirm = window.confirm(`Are you sure to remove ${name}?`);
    if (isConfirm === true) {
      const resp = await axios.delete(
        `https://api.codingthailand.com/api/category/${id}`
      );
      alert(resp.data.message);
      history.go(0); // NOTE: Equal to refresh page
    }
  };

  return (
    <main className="container">
      <div className="bg-light p-5 rounded">
        <div className="d-flex">
          <h1 className="me-2">Category Page</h1>
          <div className="my-auto">
            <Button variant="primary" onClick={createCategory}>
              Add Category
            </Button>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {category.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{ maxWidth: "500px" }}>{item.name}</td>
                <td>
                  <div className="">
                    <Button
                      className="me-lg-2 me-0 mb-2 mb-lg-0"
                      onClick={() => {
                        editCategory(item);
                      }}
                    >
                      <GiPencil /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteCategory(item);
                      }}
                    >
                      <GiTrashCan /> Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
};

export default Index;
