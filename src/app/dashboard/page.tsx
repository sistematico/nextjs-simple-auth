import { listUsers } from "@/actions";

type UserRow = {
  id: number;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string | null;
};

export default async function DashboardPage() {
  const users = (await listUsers()) as UserRow[];

  return (
    <main style={{ padding: 16 }}>
      <h1>Dashboard</h1>
      <p>Lista de usuários</p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: 8,
                  borderBottom: "1px solid #ddd",
                }}
              >
                ID
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: 8,
                  borderBottom: "1px solid #ddd",
                }}
              >
                Nome
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: 8,
                  borderBottom: "1px solid #ddd",
                }}
              >
                Email
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: 8,
                  borderBottom: "1px solid #ddd",
                }}
              >
                Role
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: 8,
                  borderBottom: "1px solid #ddd",
                }}
              >
                Criado em
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {u.id}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {u.name ?? "-"}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {u.email}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {u.role}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {u.createdAt}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 8 }}>
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
