import * as React from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

export default function creditCardForm() {
  return (
    <>
      <Grid
        container
        spacing={2}
        sm={12}
        justifyContent="center"
        sx={GridStyle}
      >
        <Card sx={{ margin: 2 }}>
          <CardContent>
            <Grid xs={12} sm={12} item>
              <FormControl fullWidth variant="outlined">
                <FormHelperText id="card-number" sx={{ ...textStyle }}>
                  Card Number
                </FormHelperText>
                <TextField id="outlined-basic" variant="outlined" />
              </FormControl>

              <FormControl
                fullWidth
                variant="outlined"
                sx={{ marginTop: "2rem" }}
              >
                <FormHelperText id="card-name" sx={{ ...textStyle }}>
                  Card Name
                </FormHelperText>
                <TextField id="outlined-basic" variant="outlined" />
              </FormControl>

              <Grid>
                <Grid container xs={12} sm={12} item direction={"row"}>
                  <Grid xs={12} sm={4}>
                    <FormControl
                      variant="outlined"
                      sx={{
                        width: "125px",
                        maxWidth: "125px",
                        marginTop: "2rem",
                      }}
                    >
                      <FormHelperText
                        id="expiration-date"
                        sx={{ ...textStyle, fontSize: "12px" }}
                      >
                        Expiration Date
                      </FormHelperText>
                      <MuiSelect id="outlined-basic" variant="outlined" />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <FormControl
                      variant="outlined"
                      sx={{
                        maxWidth: "125px",
                        width: "125px",
                        marginTop: "3.2rem",
                      }}
                    >
                      <MuiSelect id="outlined-basic" variant="outlined" />
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <FormControl
                      variant="outlined"
                      sx={{
                        maxWidth: "125px",
                        width: "125px",
                        marginTop: "2rem",
                        marginLeft: "0.9rem",
                      }}
                    >
                      <FormHelperText id="cvc" sx={{ ...textStyle }}>
                        CVV
                      </FormHelperText>
                      <TextField id="outlined-basic" variant="outlined" />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={12} sm={12} sx={{ marginTop: "2rem" }}>
              <Button fullWidth variant="contained">
                Submit
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
