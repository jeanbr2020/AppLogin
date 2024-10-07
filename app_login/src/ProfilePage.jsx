import React from 'react';
import './ProfilePage.css'; // Certifique-se de criar este arquivo CSS se precisar de estilos

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <h2>Página de Perfil</h2>
      {/* Aqui você pode adicionar um formulário para editar as informações do usuário */}
      <div className="profile-info">
        <p><strong>Nome:</strong> Usuário Exemplo</p>
        <p><strong>Email:</strong> usuario@example.com</p>
        {/* Aqui você pode incluir a opção de alterar a foto de perfil */}
      </div>
      <button className="edit-button">Editar Perfil</button>
    </div>
  );
};

export default ProfilePage;
