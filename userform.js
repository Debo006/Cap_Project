 
        function generateForm() {
            const months = parseInt(document.getElementById('monthsInput').value);
            const container = document.getElementById('formContainer');
            container.innerHTML = '';
            for (let i = 0; i < months; i++) {
                const section = document.createElement('div');
                section.className = 'month-section';
                section.setAttribute('data-month-index', i + 1);
                section.innerHTML = `
                    <h3>Month ${i + 1}</h3>
                    <div class="product-list"></div>
                    <div class="product-controls">
                        <button class="add-btn" onclick="addProduct(this)">+ Add Product</button>
                    </div>
                    <div class="totals">
                        <strong>Total Money Spent (INR):</strong> <span class="total-spent">0</span><br>
                        <strong>Total Profit Made (INR):</strong> <span class="total-profit">0</span>
                    </div>
                    <button class="submit-btn" onclick="submitMonth(this)">Submit Month Data</button>
                `;
                container.appendChild(section);
                addProduct(section.querySelector('.add-btn'));
            }
        }

        function addProduct(button) {
            const list = button.closest('.month-section').querySelector('.product-list');
            const entry = document.createElement('div');
            entry.className = 'product-entry';
            entry.innerHTML = `
                <input type="text" placeholder="Product Name">
                <input type="number" placeholder="Cost Price" oninput="calculateTotals(this)">
                <input type="number" placeholder="Sell Price" oninput="calculateTotals(this)">
                <input type="number" placeholder="Units Sold" oninput="calculateTotals(this)">
                <input type="number" placeholder="Units Left">
                <input type="text" placeholder="Total Made (INR)" readonly>
                <button class="remove-btn" onclick="removeProduct(this)">Remove</button>
            `;
            list.appendChild(entry);
        }

        function removeProduct(button) {
            const entry = button.parentElement;
            const list = entry.parentElement;
            const monthSection = button.closest('.month-section');
            list.removeChild(entry);
            calculateTotalsFromSection(monthSection);
        }

        function calculateTotals(element) {
            const monthSection = element.closest('.month-section');
            calculateTotalsFromSection(monthSection);
        }

        function calculateTotalsFromSection(monthSection) {
            const entries = monthSection.querySelectorAll('.product-entry');
            let totalSpent = 0;
            let totalProfit = 0;

            entries.forEach(entry => {
                const inputs = entry.querySelectorAll('input');
                const cost = parseFloat(inputs[1].value) || 0;
                const sell = parseFloat(inputs[2].value) || 0;
                const sold = parseInt(inputs[3].value) || 0;

                const moneyMade = sell * sold;
                inputs[5].value = moneyMade.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

                totalSpent += cost * sold;
                totalProfit += (sell - cost) * sold;
            });

            monthSection.querySelector('.total-spent').textContent = totalSpent.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
            monthSection.querySelector('.total-profit').textContent = totalProfit.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

            return { totalSpent, totalProfit };
        }

        function submitMonth(button) {
            const monthSection = button.closest('.month-section');
            const monthIndex = monthSection.getAttribute('data-month-index');
            const { totalSpent, totalProfit } = calculateTotalsFromSection(monthSection);
            const monthData = [];
            const entries = monthSection.querySelectorAll('.product-entry');

            entries.forEach(entry => {
                const inputs = entry.querySelectorAll('input');
                const product = {
                    name: inputs[0].value,
                    costPrice: parseFloat(inputs[1].value) || 0,
                    sellPrice: parseFloat(inputs[2].value) || 0,
                    unitsSold: parseInt(inputs[3].value) || 0,
                    unitsLeft: parseInt(inputs[4].value) || 0,
                    totalMade: parseFloat(inputs[5].value.replace(/[^\d.-]/g, '')) || 0
                };
                monthData.push(product);
            });

            console.log(`Submitted Data for Month ${monthIndex}:`, monthData);
            console.log(`Total Money Spent for Month ${monthIndex}:`, totalSpent);
            console.log(`Total Profit for Month ${monthIndex}:`, totalProfit);
            alert(`Month ${monthIndex} data submitted successfully. Check the console for details.`);
        }

        function submitBudget() {
            const budget = parseFloat(document.getElementById('nextMonthBudget').value) || 0;
            const display = document.getElementById('budgetDisplay');
            display.textContent = `Budget Submitted: ₹${budget.toLocaleString('en-IN')}`;
            console.log("Next Month Budget Submitted:", budget);
        }

        function submitAllData() {
            const allMonths = document.querySelectorAll('.month-section');
            allMonths.forEach(monthSection => {
                const monthIndex = monthSection.getAttribute('data-month-index');
                const { totalSpent, totalProfit } = calculateTotalsFromSection(monthSection);
                const monthData = [];
                const entries = monthSection.querySelectorAll('.product-entry');

                entries.forEach(entry => {
                    const inputs = entry.querySelectorAll('input');
                    const product = {
                        name: inputs[0].value,
                        costPrice: parseFloat(inputs[1].value) || 0,
                        sellPrice: parseFloat(inputs[2].value) || 0,
                        unitsSold: parseInt(inputs[3].value) || 0,
                        unitsLeft: parseInt(inputs[4].value) || 0,
                        totalMade: parseFloat(inputs[5].value.replace(/[^\d.-]/g, '')) || 0
                    };
                    monthData.push(product);
                });

                console.log(`Submitted Data for Month ${monthIndex}:`, monthData);
                console.log(`Total Money Spent for Month ${monthIndex}:`, totalSpent);
                console.log(`Total Profit for Month ${monthIndex}:`, totalProfit);
            });

            const budget = parseFloat(document.getElementById('nextMonthBudget').value) || 0;
            console.log("Next Month Budget Submitted:", budget);
            alert("All data submitted successfully. Check the console for full details.");
        }
    