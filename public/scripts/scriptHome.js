let currentUserId;

document.addEventListener("DOMContentLoaded", function () {
  currentUserId = localStorage.getItem("currentUserId");
  if (!currentUserId) {
    window.location.href = "/signin";
  }
});

function openModal(roomCode, timeSlot, isBooked, bookedByUser) {
  const modal = document.getElementById("bookingModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const roomSpan = document.getElementById("selectedRoom");
  const timeSpan = document.getElementById("selectedTime");

  roomSpan.textContent = roomCode;
  timeSpan.textContent = timeSlot;

  if (isBooked && bookedByUser) {
    modalTitle.textContent = "Gerenciar Reserva";
    modalContent.innerHTML = `
                <p>Você já possui uma reserva para esta sala neste horário.</p>
                <button type="button" onclick="editBooking('${roomCode}', '${timeSlot}')">Editar Reserva
                </button>
                <button type="button" onclick="cancelBooking('${roomCode}', '${timeSlot}')">Cancelar Reserva</button>
            `;
  } else if (isBooked) {
    modalTitle.textContent = "Sala Ocupada";
    modalContent.innerHTML =
      "<p>Esta sala já está reservada para este horário.</p>";
  } else {
    modalTitle.textContent = "Confirmar Reserva";
    modalContent.innerHTML = `
                <p>Deseja confirmar a reserva desta sala?</p>
                <button type="button" onclick="confirmBooking('${roomCode}', '${timeSlot}')">Confirmar Reserva</button>
            `;
  }

  modal.classList.add('show');
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("bookingModal");
  modal.classList.remove('show');
  modal.style.display = "none";
}

async function confirmBooking(roomCode, timeSlot) {
  console.log(`Reservando sala ${roomCode} no horário ${timeSlot}`);
  try {
    // Busca a sala pelo código
    const roomResponse = await fetch(`/api/rooms/code/${roomCode}`);
    const roomData = await roomResponse.json();

    if (!roomResponse.ok || !roomData) {
      alert(`Erro ao buscar sala ${roomCode}`);
      return;
    }

    // Cria a reserva
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        room_id: roomData.id,
        time_slot: timeSlot
      }),
      credentials: 'include' // Importante para sessão
    });

    const result = await response.json();
    if (response.ok) {
      alert("Reserva confirmada!");
      window.location.reload();
    } else {
      alert(result.error || "Erro ao reservar");
    }
  } catch (err) {
    console.error("Erro:", err);
    alert("Erro de conexão");
  } finally {
    closeModal();
  }
}

async function editBooking(roomCode, timeSlot) {
  console.log(`Editando reserva da sala ${roomCode} no horário ${timeSlot}`);
  try {
    // Busca a sala pelo código
    const roomResponse = await fetch(`/api/rooms/code/${roomCode}`);
    const roomData = await roomResponse.json();

    if (!roomResponse.ok || !roomData) {
      alert(`Erro ao buscar sala ${roomCode}`);
      return;
    }

    // Busca a reserva específica
    const bookingResponse = await fetch(`/api/bookings/user/${currentUserId}/room/${roomCode}/time/${timeSlot}`);
    
    if (!bookingResponse.ok) {
      alert("Erro ao buscar reserva");
      return;
    }
    
    const bookingData = await bookingResponse.json();

    // Pergunta o novo horário para o usuário
    const newTime = prompt("Novo horário (HH:MM):", timeSlot);
    if (!newTime) return;

    // Atualiza a reserva com o novo horário
    const response = await fetch(`/api/bookings/${bookingData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        room_id: roomData.id,
        user_id: currentUserId, 
        time_slot: newTime 
      }),
      credentials: 'include'
    });

    if (response.ok) {
      alert("Reserva atualizada!");
      window.location.reload();
    } else {
      alert("Erro ao atualizar reserva.");
    }
  } catch (err) {
    console.error("Erro:", err);
    alert("Erro ao editar");
  } finally {
    closeModal();
  }
}

async function cancelBooking(roomCode, timeSlot) {
  console.log(`Cancelando reserva da sala ${roomCode} no horário ${timeSlot}`);
  // Simple confirmation
  if (!confirm('Tem certeza que deseja cancelar esta reserva?')) return;
  
  try {
    // Busca a reserva específica
    const bookingResponse = await fetch(`/api/bookings/user/${currentUserId}/room/${roomCode}/time/${timeSlot}`);
    
    if (!bookingResponse.ok) {
      alert("Erro ao buscar reserva");
      return;
    }
    
    const bookingData = await bookingResponse.json();

    // Deleta a reserva
    const response = await fetch(`/api/bookings/${bookingData.id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (response.ok) {
      alert('Reserva cancelada!');
      window.location.reload();
    } else {
      alert('Erro ao cancelar reserva.');
    }
  } catch (err) {
    console.error("Erro:", err);
    alert('Erro ao cancelar');
  } finally {
    closeModal();
  }
}

window.onclick = function (event) {
  const modal = document.getElementById("bookingModal");
  if (event.target === modal) {
    closeModal();
  }
};
