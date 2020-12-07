import "./App.css";
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import { Formik, Field, Form, FormikConfig, FormikValues } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { object, mixed, number } from "yup";

function App() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            firstName: "",
            lastName: "",
            millioniare: false,
            money: 0,
            description: "",
          }}
          validateSchema={object({
            money: mixed().when("millioniare", {
              is: true,
              then: number()
                .required()
                .min(1_000_000, "Amount most be greater than 1 million USD"),
              otherwise: number().required(),
            }),
          })}
          // onSubmit={() => {}}
        >
          <div>
            <Field name="firstName" component={TextField} label="First Name" />
            <Field name="lastName" component={TextField} label="Last Name" />
            <Field
              name="millioniare"
              type="checkbox"
              component={CheckboxWithLabel}
              Label={{ label: "I am a millioniare" }}
            />
          </div>

          <div>
            <Field
              name="money"
              component={TextField}
              label="Money I can flex!"
              type="number"
            />
          </div>
          <div>
            <Field
              name="description"
              component={TextField}
              label="Description"
            />
          </div>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

// export function FormikStep({ children, ...props }) {
//   return <div>{children}</div>;
// }

export function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  let currentChild = childrenArray[step];
  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };
  return (
    <Formik
      {...props}
      
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          console.log("Hi")
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      <Form autoComplete="off">
        {currentChild}
        {step > 0 ? (
          <Button onClick={() => setStep((s) => s - 1)}>Back</Button>
        ) : null}
        <Button type="submit">{isLastStep() ? "Submit" : "Next"}</Button>
      </Form>
    </Formik>
  );
}

export default App;
