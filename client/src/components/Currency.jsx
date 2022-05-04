import React from 'react';

function Currency() {
  
  /* const */
  
  return (
    <div className="Currency">
      <br/>
      <div align="center">
          <div class="col-lg-5">
            <h1 class="font-weight-light">Currency Converter</h1>
            <p>
              Here is where you convert currency
            </p>
          </div>
        </div>
    
      <br/><br/>
 
      <div class="container" align="center">
        <v-row>

          <v-col align="center">
            <form value="currency_input_type" align="center">
              <label>
                From:
              </label>
              <select>
                <option currency_input_type="(USD)"> US dollar (USD) </option>
                <option currency_input_type="(EUR)"> Euro (EUR) </option>
                <option currency_input_type="(CNH)"> Chinese renminbi (CNH) </option>
              </select>
            </form>
            <form value="currency_input_value" align="center">
              <label>
                Input Amount: 
              </label>
              <input 
                type = 'integer'
                required
              />
            </form>
          </v-col>

        <br/>
        <br/>

          <v-col align="center">

            <form value="currency_output_type" align="center">
              <label>
                To:
              </label>
              <select>
                <option currency_output_type="(USD)"> US dollar (USD) </option>
                <option currency_output_type="(EUR)"> Euro (EUR) </option>
                <option currency_output_type="(CNH)"> Chinese renminbi (CNH) </option>
              </select>
            </form>
            <form value="currency_output_value" align="center">
              <label>
                Output Amount: 
              </label>
              <input
                type = 'integer'
                required
              />
            </form>
              
          </v-col>  
          
        </v-row>
          
        <button  className="btn" type="submit">
            Submit
            </button>
      </div>
    </div>
  );
}

export default Currency;