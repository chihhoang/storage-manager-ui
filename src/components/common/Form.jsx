import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";

class Form extends Component {
  state = {
    data: { username: "", password: "", description: "" },
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };

    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    // dynamically set name
    const obj = { [name]: value };

    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("handle submit");

    // const errors = this.validate();
    // this.setState({ errors: errors || {} });

    // if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    // const errors = { ...this.state.errors };

    // const errorMessage = this.validateProperty(input);
    // if (errorMessage) {
    //   errors[input.name] = errorMessage;
    // } else {
    //   delete errors[input.name];
    // }

    const data = { ...this.state.data };
    data[input.name] = input.value; // passed from name element in input
    this.setState({ data });
    // this.setState({ data, errors });
  };

  renderInput(name, label, type, placeHolder) {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        type={type}
        placeHolder={placeHolder}
        error={errors[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button
        // disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }
}

export default Form;
