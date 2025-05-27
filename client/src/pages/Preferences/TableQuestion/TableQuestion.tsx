import { FormEventHandler, useCallback } from 'react';

type TableQuestionProps = {
    onSubmit: (value: number[]) => void;
};

export const TableQuestion = (props: TableQuestionProps) => {
    const { onSubmit } = props;

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const values = Array.from(formData.entries()).map(([, value]) => Number(value));

            if (values.some((value) => isNaN(value))) {
                alert('אנא מלאו את כל השדות.');
                return;
            }

            onSubmit(values);
        },
        [onSubmit]
    );

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <thead>
                    <tr>
                        <td>כמות שנשלחה</td>
                        <td>כמות שקיבלתם (פי 3)</td>
                        <td>כמה הייתם מחזירים?</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>5$</td>
                        <td>15$</td>
                        <td>
                            <input name='15' type='number' min={0} max={15} placeholder='0-15$' />
                        </td>
                    </tr>
                    <tr>
                        <td>10$</td>
                        <td>30$</td>
                        <td>
                            <input name='30' type='number' min={0} max={30} placeholder='0-30$' />
                        </td>
                    </tr>
                    <tr>
                        <td>15$</td>
                        <td>45$</td>
                        <td>
                            <input name='45' type='number' min={0} max={45} placeholder='0-45$' />
                        </td>
                    </tr>
                    <tr>
                        <td>20$</td>
                        <td>60$</td>
                        <td>
                            <input name='60' type='number' min={0} max={60} placeholder='0-60$' />
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
};
