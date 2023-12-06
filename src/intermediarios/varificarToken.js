const jwt = require("jsonwebtoken");
const conexaoPg = require("../configuracoes/bancoDeDados");

const verificarToken = async (req, res, next) => {
  const { authorization: autorizacao } = req.headers;
  if (!autorizacao) {
    return res.status(401).json({ mensagem: "Usuário inválido" });
  }
  try {
    const token = autorizacao.split(" ")[1];
    const { id: idUsuarioLogado } = jwt.verify(token, process.env.SENHA_JWT);

    const textoQuery = `
      SELECT id, nome, email FROM usuarios
      WHERE id = $1;
    `;
    const valoresQuery = [idUsuarioLogado];

    const { rowCount: quantidadeUsuarios, rows: usuariosLogados } =
      await conexaoPg.query(textoQuery, valoresQuery);

    if (quantidadeUsuarios === 0) {
<<<<<<< HEAD
      return res.status(401).json({ mensagem: "Usuário inválido" })
=======
      return res.status(401).json({ mensagem: "Usuário inválido" });
>>>>>>> 157e36a58423bb1a6c3f9b27649aedda3a896f85
    }

    req.usuarioLogado = usuariosLogados[0];

    next();
  } catch (error) {
    console.log(error.message);
<<<<<<< HEAD
    return res.status(500).json({ mensagem: "Erro interno no servidor" })
=======
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
>>>>>>> 157e36a58423bb1a6c3f9b27649aedda3a896f85
  }
};

module.exports = verificarToken;
