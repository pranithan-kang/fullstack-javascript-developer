import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";

import HttpError from "../../components/HttpError";

import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Category Name is required"),
});

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState(null);
  const cancelToken = useRef();
  const history = useHistory();
  const onSubmit = async (data) => {
    // console.log(data);
    try{
      const resp = await axios.post(
        "https://api.codingthailand.com/api/category",
        {
          name: data.name,
        },
        {
          cancelToken: cancelToken.current.token,
        }
      );
      alert(resp.data.message);
      history.replace("/category");
    }
    catch(error) {
      if(!axios.isCancel(error)) setError(error);
    }
  };

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    return () => {
      cancelToken.current.cancel();
      console.log("Exit Category Create page");
    };
  }, []);

  if (error) {
    return <HttpError message={error.response.data.message}/>
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

export default Create;
