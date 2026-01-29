export async function createUser(
  name: string,
  email: string,
  cpf: string,
  password: string
) {
  const response = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, cpf, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw data
  }

  return data
}
