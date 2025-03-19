import styled from "styled-components";

const LangBtn = styled.button`
    width: 3.75rem;
    height: 2rem;
    border: 1px solid var(--cmt-color-border-secondary);
    border-radius: 0.5rem;
    background: var(--cmt-color-alpha-dark-30);
    backdrop-filter: blur(3px);
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
`;


const Global: React.FC = () => {
    return(
        <LangBtn></LangBtn>
    )
}
export default Global;