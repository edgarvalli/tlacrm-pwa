import React from "react";
import {
  Card,
  Button,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
  FormControlLabel
} from "@material-ui/core";
import evclient from "../../helpers/evclient";

function LoginPage() {
  // States
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  // Methods

  const handleSubmit = async ev => {
    ev.preventDefault();
    const response = await evclient().login(username, password, checked);
    if (response.error) {
      setError(response.message);
    } else {
      window.location.reload();
    }
  };

  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="TlaCrm" subheader="Sistema de administración de clientes" />
        <CardContent>
          <TextField
            onChange={el => setUsername(el.target.value)}
            value={username}
            label="Usuario"
            fullWidth
          />
          <TextField
            onChange={el => setPassword(el.target.value)}
            label="Contrasena"
            value={password}
            type="password"
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={el => setChecked(el.target.checked)}
              />
            }
            label="Autologin"
          />
          <Typography color="secondary">{error}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" type="submit">
            Iniciar Sesion
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default LoginPage;
