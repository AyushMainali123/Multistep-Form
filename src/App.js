import "./App.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Formik, Field, Form, FormikConfig, FormikValues } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { object, mixed, number } from "yup";


export function FormikStepper({ children, ...props }) {
  console.log(props)
  return (
    <Formik {...props}>
      <Form autoComplete="off">{children}</Form>
    </Formik>
  );
}


function App() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          validationSchema={object({
            money: mixed().when("millioniare", {
              is: true,
              then: number()
                .required()
                .min(1_000_000, "Amount most be greater than 1 million USD"),
              otherwise: number().required(),
            }),
          })}
          initialValues={{
            firstName: "",
            lastName: "",
            millioniare: false,
            money: 0,
            description: "",
          }}
        >

            <div>
              <Field
                name="firstName"
                component={TextField}
                label="First Name"
              />
              <Field name="lastName" component={TextField} label="Last Name" />
            </div>
            <div>
              <Field
                name="millioniare"
                type="checkbox"
                component={CheckboxWithLabel}
                Label={{ label: "I am a millioniare" }}
              />
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

export default App;



