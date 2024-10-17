import { useEffect, useState } from "react"
import './MainContent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

const MainContent = () => {

    // Gerenciamento de estado
    const [userName, setUserName] = useState('');
    const [userHeight, setUserHeight] = useState('');
    const [userWeight, setUserWeight] = useState('');
    const [imc, setImc] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [history, setHistory] = useState([]);

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
        const calculatedIMC = userWeight / (userHeight * userHeight);

        // Validar formulário
        if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
            setImc(calculatedIMC.toFixed(2));
            setShowResult(true);
        } else {
            alert("Por favor, insira valores válidos para altura e peso!");
        }
    }

    const getIMCResult = (value) => {
        if(value < 18){
            return `Categoria: Magreza Leve`
        } else if(value < 24.9) {
            return `Categoria: Peso Ideal`
        } else if(value < 29.9) {
            return `Categoria: Sobrepeso`
        } else if(value < 34.9) {
            return `Categoria: Obresidade grau I`
        }
    }

    const saveResult = () => {
        const result = {
            name: userName,
            height: userHeight,
            weight: userWeight,
            imc: imc,
            category: getIMCResult(imc)
        }
        setHistory([...history, result])
    }

    useEffect(() => {
        if(imc !== null) {
            saveResult();
        }
    }, [imc]);

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
                <button type="submit" id="btn-calc" onClick={calculateIMC}>
                    Calcular 
                    <FontAwesomeIcon icon={faCheck} className="icon-spacing"/>
                </button>
                <button type="reset" onClick={clearInput}>
                    Limpar
                    <FontAwesomeIcon icon={faLeftLong} className="icon-spacing"/>
                </button>
            </form>
            <div id="show-result">
                {showResult && imc !== null && (
                    <div>
                        <h3>Olá {userName}</h3>
                        <p>O seu imc é: {imc}</p>
                        <p>{getIMCResult(imc)}</p>
                    </div>
                )}
            </div>
            <div id="history">
                <h3>Histórico de Resultados</h3>

                <ul>
                    {history.map((item) => (
                        <li key={history.length + 1}>
                            {item.name} - IMC: {item.imc} - {item.category}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default MainContent