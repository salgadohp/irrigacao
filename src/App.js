import { useStyles } from "./style";
import "./App.css";
import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { irrigar } from "./irrigar";
import Modal from "@material-ui/core/Modal";
const direcao = [
  {
    value: "N",
    label: "Norte",
  },
  {
    value: "S",
    label: "Sul",
  },
  {
    value: "L",
    label: "Leste",
  },
  {
    value: "O",
    label: "Oeste",
  },
];
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function App() {
  const [dir, setdir] = React.useState("N");
  const [rows, setRows] = React.useState([1]);
  const [tamanhoHorta, setTam] = React.useState({});
  const [posicao, setPosicao] = React.useState({});
  const [hortaX, setHortaX] = React.useState([]);
  const [hortaY, setHortaY] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [caminho, setCaminhi] = React.useState({});
  const [modalStyle] = React.useState(getModalStyle);
  const handleChange = (event) => {
    setdir(event.target.value);
  };
  const handleIrrigar = () => {
    let hortas = [];
    hortaY.forEach((h, i) => {
      hortas.push({
        posiX: Number(hortaX[i]),
        posiY: Number(h),
        irrigado: false,
      });
    });
    console.log({ tamanhoHorta, posicao, dir, hortas });

    let result = irrigar(tamanhoHorta, posicao, dir, hortas);
    setCaminhi(result);
    setOpen(true);
  };
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.root}>
        <Paper elevation={3}>
          <h3>Hortaliças e Hortaliças</h3>
          <form className={classes.form} noValidate autoComplete="off">
            <div>
              <TextField
                id="tamX"
                label="Tamanho da horta"
                placeholder="Coordenada X"
                onChange={(e) => {
                  setTam({ ...tamanhoHorta, x: e.target.value });
                }}
              />
              <TextField
                id="tamY"
                label="Tamanho da horta"
                placeholder="Coordenada Y"
                onChange={(e) => {
                  setTam({ ...tamanhoHorta, y: e.target.value });
                }}
              />
            </div>

            <div>
              <TextField
                id="posiX"
                label="Posição inicial"
                placeholder="Coordenada X"
                onChange={(e) => {
                  setPosicao({ ...posicao, posiX: e.target.value });
                }}
              />
              <TextField
                id="posiY"
                label="Posição inicial"
                placeholder="Coordenada Y"
                onChange={(e) => {
                  setPosicao({ ...posicao, posiY: e.target.value });
                }}
              />
            </div>
            <div>
              <TextField
                id="direcao"
                style={{ width: "90%" }}
                select
                label="Selecione a direção inicial"
                value={dir}
                onChange={handleChange}
              >
                {direcao.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              {rows.map((r, i) => (
                <div>
                  <TextField
                    key={i + 1}
                    id="posiX"
                    label="Hortas a irrigar"
                    placeholder="Coordenada X"
                    onChange={(e) => {
                      setHortaX([...hortaX, e.target.value]);
                    }}
                  />
                  <TextField
                    key={i}
                    id="posiY"
                    label="Hortas a irrigar"
                    placeholder="Coordenada Y"
                    onChange={(e) => {
                      setHortaY([...hortaY, e.target.value]);
                    }}
                  />
                </div>
              ))}
            </div>
            <IconButton
              aria-label="Adicionar"
              className={classes.margin}
              size="medium"
              onClick={() => {
                setRows([...rows, 1]);
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
            <div>
              <Button
                variant="outlined"
                onClick={() => {
                  handleIrrigar();
                }}
              >
                Irrigar
              </Button>
            </div>
          </form>
        </Paper>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Resultado</h2>
          <p id="simple-modal-description">Caminho: {caminho.caminho}</p>
          <p id="simple-modal-description">Direção final: {caminho.orientacao}</p>
        </div>
      </Modal>
    </div>
  );
}

export default App;
