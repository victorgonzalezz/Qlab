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
import { Alert, MenuItem } from "@mui/material";

export const MuiSelect = styled(({ isValid, ...props }) => (
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
          expiry={`${values.expirationMonth}${values.expirationYear}`}
          cvc={values.cardSecurityCode}
          focused={values.focus}
        />
      </Box>
      <Grid container justifyContent="center">
        <form onSubmit={handleSubmit}>
          <Card sx={{ margin: 2, borderRadius: 5, maxWidth: 480 }}>
            <CardContent sx={{ marginTop: "8rem" }}>
              <Grid item xs={12} sm={12}>
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
                    isValid={errors.cname}
                    variant="outlined"
                  />
                </FormControl>

                <Grid container item direction={"row"}>
                  <Grid item xs={12} sm={4}>
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
                        type="select"
                        data-testid="cardExpirationMonth"
                        name="expirationMonth"
                        value={values.expirationMonth}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        isValid={errors.cexp}
                        variant="outlined"
                      >
                        {[
                          "01",
                          "02",
                          "03",
                          "04",
                          "05",
                          "06",
                          "07",
                          "08",
                          "09",
                          "10",
                          "11",
                          "12",
                        ].map((month) => (
                          <MenuItem
                            key={month}
                            value={month}
                            data-testid={`cardExpirationMonthOption-${month}`}
                          >
                            {month}
                          </MenuItem>
                        ))}
                      </MuiSelect>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
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
                        type="select"
                        data-testid="cardExpirationYear"
                        name="expirationYear"
                        value={values.expirationYear}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        isValid={errors.cexp}
                        variant="outlined"
                      >
                        {["2022", "2023", "2024", "2025", "2026", "2027"].map(
                          (year) => (
                            <MenuItem
                              key={year}
                              value={year}
                              data-testid={`cardExpirationMonthOption-${year}`}
                            >
                              {year}
                            </MenuItem>
                          )
                        )}
                      </MuiSelect>
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={4} item>
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
                        id="cardSecurityCode"
                        name="cardSecurityCode"
                        placeholder="CVV"
                        value={values.cardSecurityCode}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        isValid={errors.cvv}
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid xs={12} sm={12} sx={{ marginTop: "2rem" }} item>
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

            {errors.show && (
              <Alert
                id="alertMessage"
                data-testid="alertMessage"
                severity={
                  errors.variant !== "success" ? "error" : errors.variant
                }
              >
                {errors.message}
              </Alert>
            )}
          </Card>
        </form>
      </Grid>
    </Grid>
  );
}
