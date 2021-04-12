export function irrigar(tamanhoHorta, posicao, dir, horta) {
  let linhasY = Number(tamanhoHorta.y); //Entrada de dados
  let colunasX = Number(tamanhoHorta.x); //Entrada de dados
  let posiX = Number(posicao.posiX); // Posição inicial robo
  let posiY = Number(posicao.posiY); // Posição inicial robo
  let orientacao = dir;
  let hortas = horta
  let caminho = "";
  console.log({linhasY, colunasX, posiX, posiY, orientacao, hortas});
  
  for (let horta of hortas) {
    while (horta.irrigado === false) {
      switch (orientacao) {
        case "N": {
          if (horta.posiY < posiY) {
            caminho += " D";
            orientacao = "L";
            break;
          } else if (posiY + 1 <= linhasY && horta.posiY !== posiY) {
            posiY = posiY + 1;
            caminho += " M";
            break;
          } else {
            caminho += " D";
            orientacao = "L";
          }
          break;
        }
        case "S": {
          if (horta.posiY > posiY) {
            caminho += " E";
            orientacao = "O";
            break;
          } else if (posiY - 1 >= 0 && horta.posiY !== posiY) {
            posiY = posiY - 1;
            caminho += " M";
            break;
          } else {
            caminho += " E";
            orientacao = "O";
          }
          break;
        }
        case "L": {
          if (horta.posiX < posiX) {
            caminho += " D";
            orientacao = "S";
            break;
          } else if (posiX + 1 <= colunasX && horta.posiX !== posiX) {
            posiX = posiX + 1;
            caminho += " M";
            break;
          } else {
            caminho += " D";
            orientacao = "S";
          }
          break;
        }
        case "O": {
          if (horta.posiX > posiX) {
            caminho += " E";
            orientacao = "N";
            break;
          } else if (posiX - 1 >= 0 && horta.posiX !== posiX) {
            posiX = posiX - 1;
            caminho += " M";
            break;
          } else {
            caminho += " E";
            orientacao = "N";
          }
          break;
        }
      }
      if (horta.posiX === posiX && horta.posiY === posiY) {
        horta.irrigado = true;
        caminho += " I";
      }
    }
  }
  return {caminho, orientacao}
}
