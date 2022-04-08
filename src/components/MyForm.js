import styled from "@emotion/styled";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const names = ["Parter", "VIP", "Block 1", "Block 2", "Block 3"];

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  location: yup
    .string("Enter your location")
    .min(8, "Location should be of minimum 8 characters length")
    .required("Location is required"),
  description: yup
    .string("Enter your description")
    .min(8, "Description should be of minimum 8 characters length")
    .required("Description is required"),
  tickets: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Ticket name is required"),
        price: yup
          .number()
          .nullable(false)
          .min(1, "Minimum value is 1.")
          .required("Price is required"),
        quantity: yup
          .number()
          .nullable(false)
          .min(1, "Minimum value is 1.")
          .required("Quantity is required"),
      })
    )
    .required("Ticket is required"),
});

const MyForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      description: "",
      tickets: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <div>
        <TextField
          label="Name:*"
          variant="outlined"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          label="Location:*"
          variant="outlined"
          name="location"
          id="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
        />
        <TextField
          label="Description:*"
          minRows={4}
          variant="outlined"
          multiline
          name="description"
          id="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
      </div>
      <div>
        <TextField
          select
          SelectProps={{
            multiple: true,
            value: formik.values.tickets,
            onChange: (event) => {
              let selected = event.target.value.reverse()[0];

              if (formik.values.tickets.map((e) => e.name).includes(selected)) {
                formik.setFieldValue(
                  "tickets",
                  formik.values.tickets.filter((e) => e.name !== selected)
                );
                return;
              }
              formik.setFieldValue("tickets", [
                ...formik.values.tickets,
                {
                  name: selected,
                  price: 0,
                  quantity: 0,
                },
              ]);
            },
            renderValue: (selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value.name}
                    label={value.name}
                    onClick={() => {
                      alert(value.name);
                    }}
                  />
                ))}
              </Box>
            ),
          }}
          label="Type of tickets:*"
          id="tickets"
          name="tickets"
          multiple
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        {formik.values.tickets.map((value, i) => (
          <TicketProperties key={value.name}>
            <TextField
              type={"number"}
              label={`${value.name} price:*`}
              variant="outlined"
              name={`tickets[${i}].price`}
              id={`tickets[${i}].price`}
              value={value.price}
              onChange={formik.handleChange}
              error={
                formik.touched.tickets?.[i].price &&
                Boolean(formik.errors.tickets?.[i].price)
              }
              helperText={
                formik.touched.tickets?.[i].price &&
                formik.errors.tickets?.[i].price
              }
            />
            <TextField
              type={"number"}
              label={`${value.name} quantity:*`}
              variant="outlined"
              name={`tickets[${i}].quantity`}
              id={`tickets[${i}].quantity`}
              value={value.quantity}
              onChange={formik.handleChange}
              error={
                formik.touched.tickets?.[i].quantity &&
                Boolean(formik.errors.tickets?.[i].quantity)
              }
              helperText={
                formik.touched.tickets?.[i].quantity &&
                formik.errors.tickets?.[i].quantity
              }
            />
          </TicketProperties>
        ))}

        <div>
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            onClick={() => {
              console.log(formik);
              formik.resetForm();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </FormContainer>
  );
};

const FormContainer = styled("form")({
  display: "flex",
  gap: "2rem",

  "& > *": {
    width: "20vw",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
});

const TicketProperties = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export default MyForm;
