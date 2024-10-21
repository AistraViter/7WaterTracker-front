import { Hearts } from "react-loader-spinner";
<<<<<<< Updated upstream

import css from './Loader.module.css';

=======
import css from './Loader.module.css';
>>>>>>> Stashed changes
export default function Loader({ loader }) {
    return (<Hearts
        visible={loader}
        type="Hearts"
        height="80"
        width="80"
        color="#0056b3"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass={css.loader}
    />
    );
}