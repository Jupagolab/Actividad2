import { useState, useRef, useEffect } from 'react';

function Modal({ api }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    usuario: '',
    contraseña: '',
    confirmarContraseña: '',
    email: '',
    telefono: '',
    rol: 'usuario', // Por defecto, el rol es usuario
  });
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de los datos, como enviarlos a un servidor
    registrarUsuario(`${api}/registrar`, formData);
    setShowModal(false);
  };

  const registrarUsuario = async (api, formData) => {
    const { usuario, nombre, apellido, email, contraseña, confirmarContraseña, rol, telefono } = formData;

    if (contraseña !== confirmarContraseña) {
      console.log([contraseña, confirmarContraseña])
      alert("Las contraseñas no coinciden");
    }

    await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'usuario': usuario,
        'nombre': `${nombre} ${apellido}`,
        'correo': email,
        'clave': contraseña,
        'telefono': telefono,
        'rol': rol,
      })
    })
      .then(res => res.json())
      .then(data => {
        window.alert(data.mensaje);
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Abrir Modal</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Por favor ingrese sus datos</h2>
            <form className='text-black' onSubmit={handleSubmit}>
              <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
              <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
              <input type="text" name="usuario" placeholder="Usuario" value={formData.usuario} onChange={handleChange} />
              <input type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} />
              <input type="password" name="confirmarContraseña" placeholder="Confirmar Contraseña" value={formData.confirmarContraseña} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
              <select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="usuario">Usuario</option>
              </select>
              <button type="submit">Registrate</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;


