import React from 'react';

function Currency() {
  return (
    <div className="Currency">
      
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
            <form align="center">
              <label>
                From:
              </label>
              <select>
                <option value="(USD)"> US dollar (USD) </option>
                <option value="(EUR)"> Euro (EUR) </option>
                <option value="(CNH)"> Chinese renminbi (CNH) </option>
              </select>
            </form>
            <form align="center">
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

            <form align="center">
              <label>
                To:
              </label>
              <select>
                <option value="(USD)"> US dollar (USD) </option>
                <option value="(EUR)"> Euro (EUR) </option>
                <option value="(CNH)"> Chinese renminbi (CNH) </option>
              </select>
            </form>
            <form align="center">
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
          
      
      </div>
    </div>
  );
}

export default Currency;