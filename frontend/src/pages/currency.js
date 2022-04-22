import React from "react";
  
const Currency = () => {
  return (
    <div align="center">
      <h1>
      Currency Converter
      </h1>
      <Container>
        <Row>
            <Col>
                <form align="center">
                    <label>
                        From
                    </label>
                    <select>
                        <option value="(USD)"> US dollar (USD) </option>
                        <option value="(EUR)"> Euro (EUR) </option>
                        <option value="(CNH)"> Chinese renminbi (CNH) </option>
                    </select>
                </form>
            </Col>
            
            <Col>
                <form align="center">
                    <label>
                      Input Amount
                    </label>
                    <input
                        type = 'integer'
                        required
                    />
                </form>
            </Col>
        </Row>
        </Container>

        <Container>
            <Row>
            <Col>
                <form align="center"> 
                     <label>
                       To
                    </label>
                    <select>
                        <option value="(USD)"> US dollar (USD) </option>
                        <option value="(EUR)"> Euro (EUR) </option>
                        <option value="(CNH)"> Chinese renminbi (CNH) </option>
                    </select>
                </form>
            </Col>

            <Col>
                <form align="center">
                    <label>
                        Converted Amount
                    </label>
                    <input
                        type = 'integer'
                        required
                    />
                </form>
            </Col>
            </Row>
        </Container>
      
    </div>
  );
};
  
export default Currency;