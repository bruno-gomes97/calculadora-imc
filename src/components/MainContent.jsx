import { useState } from "react"
import './MainContent.css'

const MainContent = () => {

    const [userName, setUserName] = useState('');
    const [userHeight, setUserHeight] = useState('');
    const [userWeight, setUserWeight] = useState('');
    const [imc, setImc] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handleHeightChange = (e) => {
        setUserHeight(e.target.value);
    }

    const handleWeightChange = (e) => {
        setUserWeight(e.target.value);
    }

    const calculateIMC = (e) => {
        e.preventDefault();
        const calculatedIMC = userWeight / (userHeight * userHeight);
        setImc(calculatedIMC.toFixed(2));
        setShowResult(true);
    }

    const clearInput = () => {
        setUserName('');
        setUserHeight('');
        setUserWeight('');
        setImc(null);
        setShowResult(false);
    }

    return (
        <main>
            <form>
                <label htmlFor="name">Nome:</label>
                <input type="text"
                       value={userName}
                       onChange={handleNameChange}
                       placeholder="Digite o seu nome" />
                <label htmlFor="name">Altura:</label>
                <input type="number"
                       step={0.01}
                       value={userHeight}
                       onChange={handleHeightChange}
                       placeholder="Digite sua altura ex.: 1.70" />
                <label htmlFor="name">Peso:</label>
                <input type="number"
                       step={0.01}
                       value={userWeight}
                       onChange={handleWeightChange}
                       placeholder="Digite seu peso ex.: 60.5"  />
                <button type="submit" onClick={calculateIMC}>Calcular</button>
                <button type="reset" onClick={clearInput}>Limpar</button>
            </form>
            <div id="show-result">
                {showResult && imc !== null && (
                    <div>
                        <h3>Olá {userName}</h3>
                        <p>O seu imc é: {imc}</p>
                    </div>
                )}
            </div>
        </main>
    )
}

export default MainContent