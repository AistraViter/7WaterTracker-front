import css from "../WhyDrinkWater/WhyDrinkWater.module.css";

export const WhyDrinkWater = () => {
    return (
        <section className={css.section}>
            <h3 className={css.h3}>Why drink water</h3>
            <ul className={css.benefitsList}>
                <li>Supply of nutrients to all organs</li>
                <li>Providing oxygen to the lungs</li>
                <li>Maintaining the work of the heart</li>
                <li>Release of processed substances</li>
                <li>Ensuring the stability of the internal environment</li>
                <li>Maintaining within the normal temperature</li>
                <li>Maintaining an immune system capable of resisting disease</li>
            </ul>
        </section>
    );
};
