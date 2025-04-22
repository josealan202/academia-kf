import db from './db';

export async function getUsuarios(id) {
        const result = await db.query('SELECT * FROM usuario WHERE id = $1', [id]);
        return result.rows[0];
}