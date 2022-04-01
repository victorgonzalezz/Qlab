import React from "react";
import useForm from "../useForm";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Alert } from "@mui/material";

export const MuiSelect = styled((props) => (
  <Select {...props} IconComponent={ExpandMoreIcon} />
))(({ theme }) => ({
  "& .MuiSelect-icon": {
    color: "#000",
    fontSize: "18px",
  },
}));

const GridStyle = {
  margin: 0,
  padding: 0,
  boxSizing: "borderBox",
};

const textStyle = {
  display: "flex",
  position: "relative",
  right: 13,
  fontSize: 13,
  fontWeight: 500,
  color: "black",
  lineHeight: "1rem",
  top: -10,
};

export default function CreditCardForm() {
  const { handleChange, handleFocus, handleSubmit, values, errors } = useForm();
  return (
    <Grid sm={12} item sx={GridStyle}>
      <Box sx={{ position: "relative", top: "8rem", marginTop: "0rem" }}>
        <Cards
          number={values.cardNumber}
          name={values.cardName}
          expiryMonth={values.expirationMonth}
          expiryYear={values.expirationYear}
          cvc={values.cardSecurityCode}
          focused={values.focus}
        />
      </Box>
      <Grid container xs={12} sm={12} item justifyContent="center">
        <Card sx={{ margin: 2, borderRadius: 5, maxWidth: 480 }}>
          <CardContent sx={{ marginTop: "8rem" }}>
            <Grid xs={12} sm={12} item>
              <FormControl fullWidth variant="outlined">
                <FormHelperText id="card-number" sx={{ ...textStyle }}>
                  Card Number
                </FormHelperText>
                <TextField
                  type="number"
                  id="cardNumber"
                  // data-testid="cardNumber"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={values.cardNumber}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  isValid={errors.cnumber}
                  onSubmit={handleSubmit}
                  variant="outlined"
                />
              </FormControl>

              <FormControl
                fullWidth
                variant="outlined"
                sx={{ marginTop: "2rem" }}
              >
                <FormHelperText id="card-name" sx={{ ...textStyle }}>
                  Card Name
                </FormHelperText>
                <TextField
                  type="text"
                  id="cardName"
                  data-testid="cardName"
                  name="cardName"
                  placeholder="Cardholder Name"
                  value={values.cardName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onSubmit={handleSubmit}
                  //  isValid={errors.cname}
                  variant="outlined"
                />
              </FormControl>

              <Grid container xs={12} sm={12} item direction={"row"}>
                <Grid xs={12} sm={4}>
                  <FormControl
                    variant="outlined"
                    sx={{
                      width: "125px",
                      maxWidth: "125px",
                      marginTop: "2rem",
                      marginLeft: "-1.4rem",
                    }}
                  >
                    <FormHelperText
                      id="expiration-date"
                      sx={{ ...textStyle, fontSize: "12px" }}
                    >
                      Expiration Date
                    </FormHelperText>
                    <MuiSelect
                      type="text"
                      id="cardExpirationMonth"
                      name="cardExpirationMonth"
                      placeholder="MM"
                      value={values.expirationMonth}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      // isValid={errors.cexp}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4}>
                  <FormControl
                    variant="outlined"
                    sx={{
                      maxWidth: "125px",
                      width: "125px",
                      marginTop: "3.2rem",
                      marginLeft: "-1.7rem",
                    }}
                  >
                    <MuiSelect
                      type="number"
                      id="expirationYear"
                      name="expirationYear"
                      placeholder="YY"
                      value={values.expirationYear}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      //  isValid={errors.ccvc}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4}>
                  <FormControl
                    variant="outlined"
                    sx={{
                      maxWidth: "125px",
                      width: "125px",
                      marginTop: "2rem",
                      marginRight: "-1.4rem",
                    }}
                  >
                    <FormHelperText id="cvc" sx={{ ...textStyle }}>
                      CVV
                    </FormHelperText>
                    <TextField
                      type="number"
                      id="cardCvc"
                      data-testid="cardCvc"
                      name="cardCvc"
                      placeholder="CVC"
                      value={values.cardSecurityCode}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      //  isValid={errors.cpostal}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={12} sm={12} sx={{ marginTop: "2rem" }}>
              <Button
                size={"block"}
                data-testid="validateButton"
                id="validateButton"
                type="submit"
                fullWidth
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </CardContent>
          <Alert
            severity="error"
            id="alertMessage"
            data-testid="alertMessage"
            variant={errors.variant}
            show={errors.show}
          >
            {errors.message}
          </Alert>
        </Card>
      </Grid>
    </Grid>
  );
}
