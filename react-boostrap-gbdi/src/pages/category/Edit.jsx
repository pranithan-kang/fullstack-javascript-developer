import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import HttpError from "../../components/HttpError";

import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Category Name is required"),
});

const Edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef();
  const history = useHistory();
  const { id: categoryId } = useParams();

  const getDataById = async (id) => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.codingthailand.com/api/category/${id}`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setValue("name", resp.data.name);
    } catch (error) {
      if (!axios.isCancel(error)) setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const resp = await axios.put(
        "https://api.codingthailand.com/api/category",
        {
          id: categoryId,
          name: data.name,
        },
        {
          cancelToken: cancelToken.current.token,
        }
      );
      alert(resp.data.message);
      history.replace("/category");
    } catch (error) {
      if (!axios.isCancel(error)) setError(error);
    }
  };

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getDataById(categoryId);
    return () => {
      cancelToken.current.cancel();
      console.log("Exit Category Create page");
    };
  }, [categoryId]);
  // NOTE: React.useEffect has a missing dependency: 'getCategoryById'. Either include it or remove the dependency array  react-hooks/exhaustive-deps


  if (error) {
    return <HttpError message={error.response?.data?.message} />;
  }

  return (
    <div className="container">
      <h1>Add Category</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="categoryName">
          <Form.Label>Name: </Form.Label>
          <Form.Control
            {...register("name")}
            type="text"
            placeholder="Enter Category Name"
          />
          <p>{errors.name?.message}</p>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Edit;
