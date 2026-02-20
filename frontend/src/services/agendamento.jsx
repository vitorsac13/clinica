const API_URL = 'http://localhost:3000/agendamentos'

export async function createAgendamento(agendamentoData) {
    const auth = JSON.parse(localStorage.getItem('auth'))

    const response = await fetch('http://localhost:3000/agendamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify(agendamentoData)
    })

    return response.json()
}

export async function getAgendamentos() {
    const auth = JSON.parse(localStorage.getItem('auth'))

    const response = await fetch('http://localhost:3000/agendamentos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
        }
    })

    return response.json()
}

export async function getMyAgendamentos() {
    const auth = JSON.parse(localStorage.getItem('auth'))

    const response = await fetch('http://localhost:3000/agendamentos/my', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
        }
    })

    return response.json()
}