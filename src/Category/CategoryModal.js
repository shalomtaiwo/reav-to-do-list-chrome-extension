import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React from 'react';
import { db } from '../Firebase-config';
import Category from './CategoryAccordion';
import Preview from './Preview';

export function ItemModal({ item, _id, user }) {
    const [todo, setTodo] = React.useState([])

    React.useEffect(() => {
        try {
            onSnapshot(
                query(collection(db, 'Category', _id, 'todos'), orderBy('created', "desc"), where("userId", "==", user?.uid)),
                querySnapshot => {
                    const todos = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setTodo(todos)
                }
            );
        } catch (error) {

        }
    }, [_id, user])

    return (
        <Category id={item.id} _id={_id} category={item.category} color={item.color}>
            {todo?.map((mytask, index) => {
                return (
                    <Preview
                        key={index}
                        task={mytask?.title.length > 36 ? mytask?.title.slice(0, 37) + '...' : mytask?.title}
                        mytask={mytask} />
                )
            })}
        </Category>

    );
}