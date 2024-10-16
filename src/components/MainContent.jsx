import { useState } from "react"
import './MainContent.css'

const MainContent = () => {

    // Gerenciamento de estado
    const [userName, setUserName] = useState('');
    const [userHeight, setUserHeight] = useState('');
    const [userWeight, setUserWeight] = useState('');
    const [imc, setImc] = useState(null);
    const [showResult, setShowResult] = useState(false);

    // Manipulação de inputs
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

        // Converte para número
        const height = parseFloat(userHeight);
        const weight = parseFloat(userWeight);

        // Validar formulário
        if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
            const calculatedIMC = userWeight / (userHeight * userHeight);
            setImc(calculatedIMC.toFixed(2));
            setShowResult(true);
        } else {
            alert("Por favor, insira valores válidos para altura e peso!");
        }
    }

    // Limpar campos
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
                    placeholder="Digite seu peso ex.: 60.5" />
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