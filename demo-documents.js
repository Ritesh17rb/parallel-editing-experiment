// Demo Documents and Scenarios for Parallel Editing Demonstration

export const demoScenarios = {
  "legal-contract": {
    title: "Legal Contract Review",
    icon: "bi-file-earmark-text",
    description: "Multi-agent review of a Master Services Agreement",
    document: `<h1 style="text-align: center;">MASTER SERVICES AGREEMENT</h1>
<p><strong>Effective Date:</strong> January 15, 2024</p>
<p><strong>Between:</strong> TechCorp Solutions Inc. ("Provider") and GlobalRetail Enterprises LLC ("Client")</p>

<h2>1. PARTIES AND RECITALS</h2>
<p>This Master Services Agreement ("Agreement") is entered into as of the Effective Date by and between TechCorp Solutions Inc., a Delaware corporation with its principal place of business at 123 Innovation Drive, San Francisco, CA 94105, and GlobalRetail Enterprises LLC, a limited liability company organized under the laws of New York with its principal office at 456 Commerce Plaza, New York, NY 10001.</p>

<p><strong>WHEREAS,</strong> Provider is engaged in the business of providing enterprise software solutions, cloud infrastructure services, and technical consulting;</p>
<p><strong>WHEREAS,</strong> Client desires to engage Provider to deliver certain services as more particularly described herein;</p>
<p><strong>NOW, THEREFORE,</strong> in consideration of the mutual covenants and agreements contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:</p>

<h2>2. SCOPE OF SERVICES</h2>
<p>Provider shall furnish to Client the following services ("Services"):</p>
<ul>
  <li>Cloud infrastructure setup and maintenance on AWS platform</li>
  <li>Custom software development for inventory management system</li>
  <li>24/7 technical support and system monitoring</li>
  <li>Quarterly security audits and compliance reporting</li>
  <li>Data migration from legacy systems to new platform</li>
  <li>Staff training and documentation preparation</li>
</ul>

<p>The specific deliverables, timelines, and acceptance criteria for each Service shall be set forth in separate Statements of Work ("SOW") executed by both parties. Each SOW shall reference this Agreement and shall be deemed incorporated herein by reference.</p>

<h2>3. TERM AND TERMINATION</h2>
<p><strong>3.1 Initial Term.</strong> This Agreement shall commence on the Effective Date and continue for an initial period of thirty-six (36) months (the "Initial Term"), unless earlier terminated in accordance with the provisions hereof.</p>

<p><strong>3.2 Renewal.</strong> Upon expiration of the Initial Term, this Agreement shall automatically renew for successive twelve (12) month periods (each a "Renewal Term"), unless either party provides written notice of non-renewal at least ninety (90) days prior to the end of the then-current term.</p>

<p><strong>3.3 Termination for Cause.</strong> Either party may terminate this Agreement immediately upon written notice if the other party: (a) materially breaches any provision of this Agreement and fails to cure such breach within thirty (30) days after receipt of written notice thereof; (b) becomes insolvent or admits its inability to pay its debts as they become due; (c) files or has filed against it a petition in bankruptcy or insolvency; or (d) makes an assignment for the benefit of creditors.</p>

<p><strong>3.4 Termination for Convenience.</strong> Client may terminate this Agreement for convenience upon ninety (90) days prior written notice to Provider, provided that Client shall pay Provider for all Services performed through the effective date of termination plus any cancellation fees specified in the applicable SOW.</p>

<h2>4. COMPENSATION AND PAYMENT TERMS</h2>
<p><strong>4.1 Fees.</strong> Client shall pay Provider the fees set forth in each SOW. Unless otherwise specified, all fees are quoted in United States Dollars and are exclusive of all applicable taxes, duties, and levies.</p>

<p><strong>4.2 Payment Schedule.</strong> Provider shall invoice Client monthly in arrears for Services performed. All invoices are due and payable within thirty (30) days of the invoice date. Late payments shall accrue interest at the rate of one and one-half percent (1.5%) per month or the maximum rate permitted by law, whichever is less.</p>

<p><strong>4.3 Expenses.</strong> Client shall reimburse Provider for all reasonable, pre-approved out-of-pocket expenses incurred in connection with the performance of Services, including travel, lodging, and materials, provided that Provider submits appropriate documentation.</p>

<p><strong>4.4 Fee Adjustments.</strong> Provider may increase fees upon sixty (60) days written notice, provided that any such increase shall not exceed five percent (5%) annually.</p>

<h2>5. INTELLECTUAL PROPERTY RIGHTS</h2>
<p><strong>5.1 Provider IP.</strong> All intellectual property rights in any pre-existing materials, tools, methodologies, frameworks, or technologies used by Provider in performing the Services ("Provider IP") shall remain the exclusive property of Provider.</p>

<p><strong>5.2 Client IP.</strong> All intellectual property rights in Client's pre-existing materials, data, and confidential information ("Client IP") shall remain the exclusive property of Client.</p>

<p><strong>5.3 Work Product.</strong> Subject to full payment of all fees, Provider hereby assigns to Client all right, title, and interest in and to any custom deliverables specifically created for Client under an SOW ("Work Product"), excluding any Provider IP incorporated therein. Provider grants Client a perpetual, worldwide, non-exclusive, royalty-free license to use any Provider IP incorporated in the Work Product solely in connection with Client's use of the Work Product.</p>

<h2>6. CONFIDENTIALITY</h2>
<p><strong>6.1 Definition.</strong> "Confidential Information" means any non-public information disclosed by one party ("Disclosing Party") to the other party ("Receiving Party"), whether orally, in writing, or by inspection of tangible objects, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure.</p>

<p><strong>6.2 Obligations.</strong> Receiving Party shall: (a) hold Confidential Information in strict confidence; (b) not disclose Confidential Information to third parties without Disclosing Party's prior written consent; (c) use Confidential Information solely for purposes of performing its obligations or exercising its rights under this Agreement; and (d) protect Confidential Information using the same degree of care it uses to protect its own confidential information, but in no event less than reasonable care.</p>

<p><strong>6.3 Exceptions.</strong> Confidential Information does not include information that: (a) is or becomes publicly available through no breach of this Agreement; (b) was rightfully known to Receiving Party without restriction prior to disclosure; (c) is rightfully disclosed to Receiving Party by a third party without restriction; or (d) is independently developed by Receiving Party without use of or reference to Confidential Information.</p>

<p><strong>6.4 Term.</strong> The obligations set forth in this Section shall survive termination of this Agreement and continue for a period of five (5) years from the date of disclosure.</p>

<h2>7. WARRANTIES AND DISCLAIMERS</h2>
<p><strong>7.1 Provider Warranties.</strong> Provider warrants that: (a) it has the right and authority to enter into this Agreement; (b) the Services shall be performed in a professional and workmanlike manner consistent with industry standards; (c) the Work Product shall not infringe upon or misappropriate any third party intellectual property rights; and (d) it shall comply with all applicable laws and regulations in performing the Services.</p>

<p><strong>7.2 Client Warranties.</strong> Client warrants that: (a) it has the right and authority to enter into this Agreement; (b) it owns or has the necessary rights to all Client IP provided to Provider; and (c) its use of the Services does not violate any applicable laws or third party rights.</p>

<p><strong>7.3 DISCLAIMER.</strong> EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, PROVIDER MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. PROVIDER DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.</p>

<h2>8. LIMITATION OF LIABILITY</h2>
<p><strong>8.1 Cap on Liability.</strong> IN NO EVENT SHALL EITHER PARTY'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT EXCEED THE TOTAL FEES PAID OR PAYABLE BY CLIENT TO PROVIDER IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY.</p>

<p><strong>8.2 Exclusion of Consequential Damages.</strong> IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOST PROFITS, LOST REVENUE, LOST DATA, OR BUSINESS INTERRUPTION, HOWEVER CAUSED AND UNDER ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, TORT, OR OTHERWISE, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

<p><strong>8.3 Exceptions.</strong> The limitations set forth in this Section shall not apply to: (a) either party's indemnification obligations; (b) either party's breach of confidentiality obligations; (c) Client's payment obligations; or (d) either party's gross negligence or willful misconduct.</p>

<h2>9. INDEMNIFICATION</h2>
<p><strong>9.1 Provider Indemnity.</strong> Provider shall indemnify, defend, and hold harmless Client and its officers, directors, employees, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or resulting from: (a) any claim that the Work Product infringes or misappropriates any third party intellectual property rights; or (b) Provider's gross negligence or willful misconduct.</p>

<p><strong>9.2 Client Indemnity.</strong> Client shall indemnify, defend, and hold harmless Provider and its officers, directors, employees, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or resulting from: (a) any claim that the Client IP infringes or misappropriates any third party intellectual property rights; or (b) Client's use of the Services in violation of applicable law or this Agreement.</p>

<h2>10. GENERAL PROVISIONS</h2>
<p><strong>10.1 Governing Law.</strong> This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflicts of law principles.</p>

<p><strong>10.2 Dispute Resolution.</strong> Any dispute arising out of or relating to this Agreement shall be resolved through binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association. The arbitration shall be conducted in San Francisco, California, and judgment upon the award may be entered in any court having jurisdiction.</p>

<p><strong>10.3 Entire Agreement.</strong> This Agreement, together with all SOWs and exhibits, constitutes the entire agreement between the parties and supersedes all prior or contemporaneous understandings, whether written or oral, regarding the subject matter hereof.</p>

<p><strong>10.4 Amendment.</strong> This Agreement may be amended only by a written instrument signed by both parties.</p>

<p><strong>10.5 Assignment.</strong> Neither party may assign this Agreement without the prior written consent of the other party, except that either party may assign this Agreement to a successor in connection with a merger, acquisition, or sale of all or substantially all of its assets.</p>

<p><strong>10.6 Notices.</strong> All notices under this Agreement shall be in writing and delivered by email, courier, or certified mail to the addresses set forth above or such other address as a party may designate in writing.</p>

<p><strong>10.7 Severability.</strong> If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>

<p><strong>10.8 Waiver.</strong> No waiver of any provision of this Agreement shall be deemed or shall constitute a waiver of any other provision, nor shall any waiver constitute a continuing waiver.</p>

<p><strong>IN WITNESS WHEREOF,</strong> the parties have executed this Agreement as of the Effective Date.</p>

<p><strong>TechCorp Solutions Inc.</strong><br>
By: _______________________<br>
Name: Sarah Johnson<br>
Title: Chief Executive Officer<br>
Date: _____________________</p>

<p><strong>GlobalRetail Enterprises LLC</strong><br>
By: _______________________<br>
Name: Michael Chen<br>
Title: Chief Operating Officer<br>
Date: _____________________</p>`,
    samplePrompts: [
      {
        text: "Review this contract for legal compliance",
        description: "Spawns 3 agents: one for parties section, one for liability clauses, one for IP rights"
      },
      {
        text: "Improve the legal quality of this document",
        description: "Multiple agents check different sections simultaneously"
      },
      {
        text: "Verify all contact details and legal entities",
        description: "Agents work on parties, notices, and signature blocks in parallel"
      }
    ]
  },

  "research-paper": {
    title: "Academic Research Paper",
    icon: "bi-journal-text",
    description: "Multi-agent editing of a scientific manuscript",
    document: `<h1 style="text-align: center;">The Impact of Machine Learning on Climate Change Prediction Models</h1>
<p style="text-align: center;"><em>A Comprehensive Analysis of Deep Learning Approaches in Environmental Science</em></p>
<p style="text-align: center;"><strong>Dr. Emily Rodriguez¹, Prof. James Chen², Dr. Sarah Williams³</strong></p>
<p style="text-align: center;">¹Department of Environmental Science, Stanford University<br>
²Institute for Climate Research, MIT<br>
³Center for Computational Biology, UC Berkeley</p>

<h2>Abstract</h2>
<p>Climate change represents one of the most pressing challenges facing humanity in the 21st century. Traditional climate prediction models, while valuable, have shown limitations in capturing the complex, non-linear dynamics of Earth's climate system. This paper presents a comprehensive analysis of how machine learning techniques, particularly deep learning architectures, are revolutionizing our ability to predict climate patterns with unprecedented accuracy. We examine the application of convolutional neural networks (CNNs), recurrent neural networks (RNNs), and transformer-based models to climate data spanning the past 150 years. Our findings demonstrate that ensemble methods combining multiple deep learning architectures can improve prediction accuracy by up to 34% compared to traditional statistical models, while also providing better uncertainty quantification. Furthermore, we discuss the implications of these improvements for policy-making, resource allocation, and long-term environmental planning.</p>

<p><strong>Keywords:</strong> climate change, machine learning, deep learning, prediction models, environmental science, neural networks, data analysis</p>

<h2>1. Introduction</h2>
<p>The Earth's climate system is characterized by extraordinary complexity, involving intricate interactions between the atmosphere, oceans, land surface, ice sheets, and biosphere. Understanding and predicting changes in this system has become increasingly critical as anthropogenic climate change accelerates. Traditional climate models, based primarily on physical equations and statistical methods, have provided valuable insights but face inherent limitations when dealing with the non-linear, chaotic nature of climate dynamics.</p>

<p>In recent years, the rapid advancement of machine learning (ML) and artificial intelligence (AI) has opened new avenues for climate science. These computational approaches excel at identifying patterns in large, complex datasets—a capability that aligns perfectly with the challenges of climate prediction. The availability of extensive historical climate data, combined with increasing computational power, has created an unprecedented opportunity to apply sophisticated ML algorithms to environmental forecasting.</p>

<p>This paper investigates how various machine learning techniques are being applied to climate prediction, with particular emphasis on deep learning architectures. We analyze their performance compared to traditional methods, examine their strengths and limitations, and explore their potential to transform our understanding of future climate scenarios. Our research draws on data from multiple sources, including satellite observations, ground-based measurements, ocean buoys, and ice core samples, spanning over 150 years of recorded climate history.</p>

<h2>2. Background and Related Work</h2>
<p><strong>2.1 Traditional Climate Modeling Approaches</strong></p>
<p>Climate prediction has historically relied on General Circulation Models (GCMs), which simulate the physics of atmospheric and oceanic circulation using fundamental equations of fluid dynamics and thermodynamics. These models, while grounded in solid physical principles, require extensive computational resources and often struggle with parameterization of sub-grid scale processes such as cloud formation, precipitation, and turbulence.</p>

<p>Statistical methods, including autoregressive integrated moving average (ARIMA) models and multivariate regression techniques, have also been employed for climate forecasting. While computationally efficient, these approaches typically assume linear relationships and may fail to capture the complex, non-linear interactions inherent in climate systems.</p>

<p><strong>2.2 Machine Learning in Environmental Science</strong></p>
<p>The application of machine learning to environmental science began in earnest in the early 2000s, with initial studies focusing on relatively simple algorithms such as decision trees and support vector machines. Research by Henderson et al. (2015) demonstrated that random forests could effectively predict regional temperature anomalies, while Kumar and Singh (2018) showed promise in using gradient boosting for precipitation forecasting.</p>

<p>The advent of deep learning marked a paradigm shift. Convolutional Neural Networks (CNNs), originally developed for image recognition, proved remarkably effective at analyzing spatial patterns in climate data. Reichstein et al. (2019) provided a comprehensive review of deep learning applications in Earth system science, highlighting the potential for these methods to discover novel patterns and relationships in environmental data.</p>

<p><strong>2.3 Recent Advances in Climate AI</strong></p>
<p>Recent work has explored increasingly sophisticated architectures. Long Short-Term Memory (LSTM) networks and other recurrent architectures have shown particular promise for time-series climate prediction. Transformer models, which have revolutionized natural language processing, are now being adapted for climate forecasting, with attention mechanisms helping to identify critical temporal and spatial relationships in climate data.</p>

<p>Notable recent contributions include the work of Rasp et al. (2020), who developed a neural network-based parameterization scheme for atmospheric convection, and Chattopadhyay et al. (2020), who demonstrated that data-driven models could produce skillful predictions of extreme weather events weeks in advance.</p>

<h2>3. Methodology</h2>
<p><strong>3.1 Data Collection and Preprocessing</strong></p>
<p>Our analysis utilizes multiple climate datasets spanning 1870 to 2023. Primary data sources include:</p>
<ul>
  <li>NOAA Global Historical Climatology Network (GHCN) for temperature and precipitation records</li>
  <li>NASA GISS Surface Temperature Analysis (GISTEMP) for global temperature anomalies</li>
  <li>ERA5 reanalysis data from the European Centre for Medium-Range Weather Forecasts (ECMWF)</li>
  <li>Satellite observations from MODIS, GOES, and other Earth observation platforms</li>
  <li>Ocean temperature and salinity data from the Argo float network</li>
  <li>Ice core data from Greenland and Antarctica providing paleoclimate context</li>
</ul>

<p>Data preprocessing involved several critical steps. Missing values were handled using multiple imputation techniques, with particular attention to maintaining temporal consistency. Outliers were identified using robust statistical methods and verified against historical records. All variables were normalized to zero mean and unit variance to facilitate neural network training. Spatial data were gridded to consistent resolutions, and temporal data were aligned to uniform time steps.</p>

<p><strong>3.2 Model Architectures</strong></p>
<p>We implemented and compared five distinct deep learning architectures:</p>

<p><strong>3.2.1 Convolutional Neural Networks (CNNs)</strong></p>
<p>Our CNN architecture consists of multiple convolutional layers designed to extract spatial features from gridded climate data. The network employs 3x3 and 5x5 kernels with ReLU activation functions, batch normalization, and dropout regularization to prevent overfitting. Max pooling layers reduce spatial dimensions while preserving important features. The final layers include fully connected networks that produce temperature and precipitation predictions.</p>

<p><strong>3.2.2 Recurrent Neural Networks (RNNs) with LSTM</strong></p>
<p>For temporal sequence modeling, we developed an LSTM-based architecture with three stacked LSTM layers, each containing 256 hidden units. The network processes time series of climate variables, with the ability to learn long-term dependencies spanning months or years. Bidirectional processing allows the model to consider both past and future context when making predictions.</p>

<p><strong>3.2.3 Hybrid CNN-LSTM Architecture</strong></p>
<p>Recognizing that climate data has both spatial and temporal structure, we created a hybrid model that first applies CNN layers to extract spatial features, then feeds these features into LSTM layers for temporal modeling. This architecture proved particularly effective for regional climate prediction tasks.</p>

<p><strong>3.2.4 Transformer-Based Models</strong></p>
<p>We adapted the transformer architecture for climate prediction, using multi-head self-attention mechanisms to identify important relationships across both space and time. Positional encodings were modified to represent both geographic coordinates and temporal positions. The model consists of 12 transformer blocks with 8 attention heads each.</p>

<p><strong>3.2.5 Ensemble Methods</strong></p>
<p>Finally, we developed an ensemble approach that combines predictions from all individual models using learned weights. A meta-learning algorithm determines optimal combination weights based on validation set performance, with different weights potentially applied for different regions and time horizons.</p>

<p><strong>3.3 Training Procedure</strong></p>
<p>All models were trained using the Adam optimizer with an initial learning rate of 0.001, which was reduced by a factor of 0.5 when validation loss plateaued. We employed early stopping with a patience of 20 epochs to prevent overfitting. The dataset was split into training (70%), validation (15%), and test (15%) sets, with temporal ordering preserved to prevent data leakage.</p>

<p>Training was conducted on a cluster of NVIDIA A100 GPUs, with typical training times ranging from 48 hours for simpler models to 10 days for the full ensemble. We used mixed-precision training to accelerate computation while maintaining numerical stability.</p>

<h2>4. Results</h2>
<p><strong>4.1 Prediction Accuracy</strong></p>
<p>Our experiments demonstrate substantial improvements in prediction accuracy compared to baseline methods. For global mean temperature prediction one year ahead, the ensemble model achieved a root mean square error (RMSE) of 0.087°C, compared to 0.132°C for the best traditional statistical model—a 34% improvement. For regional predictions, improvements ranged from 18% to 42% depending on geographic location and climate regime.</p>

<p>The transformer-based model showed particular strength in capturing long-range temporal dependencies, excelling at multi-year predictions. The CNN-LSTM hybrid performed best for regional precipitation forecasting, where both spatial patterns and temporal evolution are critical.</p>

<p><strong>4.2 Extreme Event Prediction</strong></p>
<p>A critical test of any climate model is its ability to predict extreme events such as heat waves, droughts, and heavy precipitation. Our deep learning models demonstrated superior performance in this domain. The ensemble model correctly identified 78% of extreme heat events (defined as temperatures exceeding the 95th percentile) three months in advance, compared to 52% for traditional methods.</p>

<p>For drought prediction, the models showed skill at identifying the onset of dry periods 6-9 months in advance by detecting subtle patterns in sea surface temperatures, atmospheric pressure fields, and soil moisture that precede drought conditions.</p>

<p><strong>4.3 Uncertainty Quantification</strong></p>
<p>Beyond point predictions, we implemented Monte Carlo dropout and ensemble variance to quantify prediction uncertainty. This probabilistic approach provides confidence intervals around predictions, which is crucial for decision-making. Our analysis shows that uncertainty tends to increase with prediction horizon and is higher in regions with complex topography or strong ocean-atmosphere coupling.</p>

<p><strong>4.4 Feature Importance and Interpretability</strong></p>
<p>Using gradient-based attribution methods and attention visualization, we identified which input features most strongly influence predictions. Sea surface temperatures in the tropical Pacific (related to El Niño Southern Oscillation) emerged as the most important predictor for global temperature anomalies. Arctic sea ice extent showed strong predictive power for Northern Hemisphere winter temperatures. Stratospheric conditions were identified as important for seasonal predictions, a relationship that traditional models sometimes underweight.</p>

<h2>5. Discussion</h2>
<p><strong>5.1 Advantages of Deep Learning Approaches</strong></p>
<p>The superior performance of deep learning models can be attributed to several factors. First, these models can automatically discover complex, non-linear relationships in data without requiring explicit mathematical formulation. Second, they excel at integrating diverse data sources with different spatial and temporal resolutions. Third, they can learn hierarchical representations, capturing both fine-grained local patterns and large-scale global dynamics.</p>

<p>The attention mechanisms in transformer models provide a form of interpretability, highlighting which spatial regions and time periods most influence predictions. This can offer scientific insights into climate teleconnections and causal relationships.</p>

<p><strong>5.2 Limitations and Challenges</strong></p>
<p>Despite their promise, deep learning approaches face several challenges. They require large amounts of training data, which may be limited for certain climate variables or regions. The models can be computationally expensive, both for training and inference. There are concerns about extrapolation beyond the training distribution—if future climate states differ substantially from historical patterns, model performance may degrade.</p>

<p>Physical consistency is another concern. Unlike traditional models based on conservation laws, neural networks may produce predictions that violate fundamental physical principles unless explicitly constrained. Hybrid approaches that combine physics-based models with machine learning may address this limitation.</p>

<p><strong>5.3 Implications for Climate Science and Policy</strong></p>
<p>Improved climate predictions have profound implications. More accurate seasonal and annual forecasts can inform agricultural planning, water resource management, and energy sector decisions. Better extreme event prediction enables more effective disaster preparedness and risk mitigation. Enhanced long-term projections support climate adaptation strategies and infrastructure planning.</p>

<p>For policymakers, the improved uncertainty quantification provided by these models offers a clearer picture of climate risks, supporting more informed decision-making about emissions reduction targets and adaptation investments.</p>

<h2>6. Conclusion</h2>
<p>This research demonstrates that machine learning, particularly deep learning, offers substantial improvements in climate prediction accuracy across multiple time scales and geographic regions. Our ensemble approach, combining multiple neural network architectures, achieves prediction improvements of up to 34% compared to traditional methods while also providing robust uncertainty estimates.</p>

<p>The success of these methods suggests a promising future for AI-assisted climate science. However, we emphasize that machine learning should complement, not replace, physics-based understanding. The most effective path forward likely involves hybrid approaches that leverage both the physical insights of traditional models and the pattern-recognition capabilities of deep learning.</p>

<p>Future work should focus on developing models that explicitly incorporate physical constraints, improving interpretability to enhance scientific understanding, and extending these methods to predict additional climate variables and impacts. As climate change accelerates, the tools we develop today will be crucial for understanding and adapting to tomorrow's environmental challenges.</p>

<h2>Acknowledgments</h2>
<p>This research was supported by the National Science Foundation (Grant No. NSF-2024-ENV-4521) and the Department of Energy's Office of Science. We thank the numerous organizations that make climate data freely available, including NOAA, NASA, and ECMWF. We are grateful to our colleagues who provided valuable feedback on earlier drafts of this manuscript.</p>

<h2>References</h2>
<p>[1] Reichstein, M., et al. (2019). "Deep learning and process understanding for data-driven Earth system science." <em>Nature</em>, 566(7743), 195-204.</p>
<p>[2] Rasp, S., et al. (2020). "WeatherBench: A benchmark dataset for data-driven weather forecasting." <em>Journal of Advances in Modeling Earth Systems</em>, 12(11).</p>
<p>[3] Chattopadhyay, A., et al. (2020). "Analog forecasting of extreme-causing weather patterns using deep learning." <em>Journal of Advances in Modeling Earth Systems</em>, 12(2).</p>
<p>[4] Henderson, K., et al. (2015). "Random forests for climate prediction." <em>Environmental Data Science</em>, 3(2), 112-128.</p>
<p>[5] Kumar, R., & Singh, M. (2018). "Gradient boosting for precipitation forecasting." <em>Atmospheric Research</em>, 201, 45-58.</p>`,
    samplePrompts: [
      {
        text: "Improve the academic quality of this paper",
        description: "Spawns agents for: abstract, methodology, results, and references sections"
      },
      {
        text: "Check citations and references for accuracy",
        description: "Multiple agents verify different sections' citations simultaneously"
      },
      {
        text: "Enhance technical descriptions and clarity",
        description: "Agents work on methodology, results, and discussion in parallel"
      }
    ]
  },

  "business-proposal": {
    title: "Business Proposal",
    icon: "bi-briefcase",
    description: "Multi-agent refinement of a project proposal",
    document: `<h1 style="text-align: center;">COMPREHENSIVE BUSINESS PROPOSAL</h1>
<h2 style="text-align: center;">Digital Transformation Initiative for Regional Healthcare Network</h2>
<p style="text-align: center;"><strong>Prepared for:</strong> MidState Healthcare Alliance<br>
<strong>Prepared by:</strong> TechCorp Solutions Inc.<br>
<strong>Date:</strong> December 10, 2025<br>
<strong>Proposal Valid Until:</strong> March 10, 2026</p>

<h2>EXECUTIVE SUMMARY</h2>
<p>TechCorp Solutions Inc. is pleased to present this comprehensive proposal for the digital transformation of MidState Healthcare Alliance's clinical and administrative systems. This initiative represents a strategic investment in modern healthcare technology that will enhance patient care, improve operational efficiency, ensure regulatory compliance, and position MidState Healthcare Alliance as a leader in healthcare innovation within the region.</p>

<p>Our proposed solution encompasses a fully integrated Electronic Health Records (EHR) system, advanced patient portal capabilities, AI-powered diagnostic support tools, comprehensive data analytics platform, and robust cybersecurity infrastructure. The implementation will be conducted in carefully planned phases over 18 months, minimizing disruption to ongoing clinical operations while ensuring thorough staff training and system optimization.</p>

<p><strong>Key Benefits:</strong></p>
<ul>
  <li>Improved patient outcomes through better care coordination and clinical decision support</li>
  <li>Enhanced operational efficiency with projected 30% reduction in administrative overhead</li>
  <li>Full compliance with HIPAA, HITECH, and emerging healthcare regulations</li>
  <li>Advanced analytics enabling data-driven decision making and population health management</li>
  <li>Seamless interoperability with regional health information exchanges</li>
  <li>Scalable architecture supporting future growth and technological advancement</li>
</ul>

<p><strong>Investment Summary:</strong> Total project cost of $8,750,000 with expected ROI of 185% over five years through improved efficiency, reduced errors, and enhanced revenue cycle management. Flexible financing options available.</p>

<h2>1. UNDERSTANDING YOUR NEEDS</h2>
<p><strong>1.1 Current Challenges</strong></p>
<p>Through our comprehensive needs assessment conducted over the past three months, including interviews with clinical staff, administrators, IT personnel, and patient focus groups, we have identified several critical challenges facing MidState Healthcare Alliance:</p>

<p><strong>Clinical Challenges:</strong></p>
<ul>
  <li>Fragmented patient records across multiple legacy systems, leading to incomplete clinical pictures and potential safety issues</li>
  <li>Limited clinical decision support, resulting in missed opportunities for preventive care and evidence-based interventions</li>
  <li>Inefficient care coordination between primary care, specialists, and hospital services</li>
  <li>Difficulty tracking patient outcomes and quality metrics required for value-based care programs</li>
  <li>Inadequate tools for managing chronic disease populations</li>
</ul>

<p><strong>Operational Challenges:</strong></p>
<ul>
  <li>Manual, paper-based processes consuming significant staff time and creating opportunities for errors</li>
  <li>Delayed billing and coding leading to revenue cycle inefficiencies and cash flow issues</li>
  <li>Limited visibility into operational metrics and performance indicators</li>
  <li>Difficulty scheduling and resource allocation across multiple facilities</li>
  <li>Compliance documentation consuming excessive clinical time</li>
</ul>

<p><strong>Technical Challenges:</strong></p>
<ul>
  <li>Aging IT infrastructure with multiple systems nearing end-of-life</li>
  <li>Lack of interoperability between existing systems</li>
  <li>Inadequate cybersecurity measures creating vulnerability to data breaches</li>
  <li>Limited disaster recovery and business continuity capabilities</li>
  <li>Insufficient IT support staff for current systems, let alone new technologies</li>
</ul>

<p><strong>1.2 Strategic Objectives</strong></p>
<p>MidState Healthcare Alliance has articulated clear strategic objectives for this digital transformation:</p>
<ul>
  <li>Achieve Stage 7 HIMSS Analytics EMRAM designation within three years</li>
  <li>Improve patient satisfaction scores by 25% through enhanced access and communication</li>
  <li>Reduce medical errors by 40% through clinical decision support and medication reconciliation</li>
  <li>Decrease readmission rates by 20% through better care coordination and patient engagement</li>
  <li>Improve staff satisfaction by reducing administrative burden and providing better tools</li>
  <li>Position the organization for success in value-based care and alternative payment models</li>
  <li>Enhance community health through population health management capabilities</li>
</ul>

<h2>2. PROPOSED SOLUTION</h2>
<p><strong>2.1 Solution Architecture Overview</strong></p>
<p>Our proposed solution is built on a modern, cloud-based architecture that provides scalability, reliability, and security while minimizing on-premise infrastructure requirements. The solution consists of several integrated components:</p>

<p><strong>Core EHR Platform:</strong> We recommend Epic Systems as the enterprise EHR platform, selected based on its comprehensive functionality, strong interoperability, proven track record in organizations of similar size and complexity, and robust community of users and developers. The Epic implementation will include:</p>
<ul>
  <li>EpicCare Ambulatory for outpatient clinics and physician practices</li>
  <li>EpicCare Inpatient for hospital and emergency department</li>
  <li>OpTime for surgical services and perioperative management</li>
  <li>Beacon for oncology services</li>
  <li>Healthy Planet for population health and care management</li>
  <li>MyChart patient portal for patient engagement</li>
  <li>Epic Rover for mobile clinical access</li>
</ul>

<p><strong>Advanced Analytics Platform:</strong> A comprehensive data warehouse and analytics solution powered by Microsoft Azure and Tableau, providing:</p>
<ul>
  <li>Real-time operational dashboards for administrators and department leaders</li>
  <li>Clinical quality metrics and outcome tracking</li>
  <li>Financial and revenue cycle analytics</li>
  <li>Population health analytics and risk stratification</li>
  <li>Predictive modeling for resource planning and patient outcomes</li>
  <li>Custom reporting capabilities for all stakeholders</li>
</ul>

<p><strong>AI-Powered Clinical Decision Support:</strong> Integration of artificial intelligence and machine learning tools including:</p>
<ul>
  <li>Diagnostic imaging analysis using IBM Watson Health</li>
  <li>Sepsis prediction and early warning systems</li>
  <li>Medication interaction checking and dosing optimization</li>
  <li>Clinical pathway recommendations based on evidence-based guidelines</li>
  <li>Natural language processing for clinical documentation</li>
</ul>

<p><strong>Cybersecurity Infrastructure:</strong> Enterprise-grade security measures including:</p>
<ul>
  <li>Multi-factor authentication for all system access</li>
  <li>Advanced threat detection and response systems</li>
  <li>Encryption of data at rest and in transit</li>
  <li>Regular security audits and penetration testing</li>
  <li>Comprehensive backup and disaster recovery systems</li>
  <li>Security information and event management (SIEM) platform</li>
  <li>24/7 security operations center monitoring</li>
</ul>

<p><strong>2.2 Key Features and Capabilities</strong></p>

<p><strong>Clinical Capabilities:</strong></p>
<ul>
  <li>Comprehensive electronic health records accessible across all care settings</li>
  <li>Clinical decision support with evidence-based order sets and protocols</li>
  <li>Computerized physician order entry (CPOE) with advanced safety checks</li>
  <li>Electronic medication administration record (eMAR) with barcode scanning</li>
  <li>Clinical documentation with templates, voice recognition, and ambient listening</li>
  <li>Results management with automated routing and critical value alerts</li>
  <li>Care coordination tools including care plans, task management, and team communication</li>
  <li>Telehealth capabilities for virtual visits and remote monitoring</li>
</ul>

<p><strong>Patient Engagement:</strong></p>
<ul>
  <li>Patient portal with access to medical records, test results, and visit summaries</li>
  <li>Online appointment scheduling and prescription refills</li>
  <li>Secure messaging with care teams</li>
  <li>Educational resources tailored to patient conditions</li>
  <li>Mobile app for iOS and Android devices</li>
  <li>Patient-reported outcomes collection</li>
  <li>Automated appointment reminders and health maintenance notifications</li>
</ul>

<p><strong>Operational Capabilities:</strong></p>
<ul>
  <li>Integrated scheduling across all departments and facilities</li>
  <li>Revenue cycle management with automated coding assistance</li>
  <li>Supply chain management and inventory control</li>
  <li>Staff scheduling and workforce management</li>
  <li>Quality reporting and regulatory compliance tools</li>
  <li>Credentialing and provider enrollment management</li>
</ul>

<h2>3. IMPLEMENTATION APPROACH</h2>
<p><strong>3.1 Implementation Methodology</strong></p>
<p>Our implementation follows a proven methodology refined through over 200 successful healthcare IT projects. The approach emphasizes:</p>
<ul>
  <li><strong>Phased Implementation:</strong> Rolling out functionality in manageable phases to minimize disruption and allow for learning and optimization</li>
  <li><strong>User-Centered Design:</strong> Extensive involvement of end users in workflow design and system configuration</li>
  <li><strong>Comprehensive Training:</strong> Multi-modal training approach including classroom sessions, e-learning, simulation, and at-the-elbow support</li>
  <li><strong>Change Management:</strong> Structured approach to managing organizational change with executive sponsorship, physician champions, and super-user networks</li>
  <li><strong>Quality Assurance:</strong> Rigorous testing at every phase including unit testing, integration testing, user acceptance testing, and performance testing</li>
</ul>

<p><strong>3.2 Implementation Timeline</strong></p>

<p><strong>Phase 1: Foundation (Months 1-4)</strong></p>
<ul>
  <li>Project kickoff and governance structure establishment</li>
  <li>Infrastructure setup including network upgrades, server deployment, and security implementation</li>
  <li>Data migration planning and initial data quality assessment</li>
  <li>Workflow analysis and process redesign workshops</li>
  <li>System configuration based on workflow requirements</li>
  <li>Development of training materials and curricula</li>
</ul>

<p><strong>Phase 2: Core Clinical Systems (Months 5-10)</strong></p>
<ul>
  <li>EHR build and configuration for ambulatory and inpatient settings</li>
  <li>Integration with laboratory, radiology, and pharmacy systems</li>
  <li>Clinical decision support rule development and testing</li>
  <li>Staff training programs (physicians, nurses, allied health professionals)</li>
  <li>Pilot implementation at selected clinic and hospital unit</li>
  <li>Optimization based on pilot feedback</li>
  <li>Phased go-live across remaining facilities</li>
</ul>

<p><strong>Phase 3: Advanced Features (Months 11-15)</strong></p>
<ul>
  <li>Patient portal launch and patient enrollment campaign</li>
  <li>Analytics platform deployment and dashboard development</li>
  <li>AI-powered clinical tools integration</li>
  <li>Population health management tools activation</li>
  <li>Telehealth platform implementation</li>
  <li>Advanced reporting and quality measure tracking</li>
</ul>

<p><strong>Phase 4: Optimization and Expansion (Months 16-18)</strong></p>
<ul>
  <li>System optimization based on usage patterns and user feedback</li>
  <li>Advanced workflow automation implementation</li>
  <li>Integration with regional health information exchange</li>
  <li>Specialty-specific tools and templates</li>
  <li>Research and quality improvement capabilities</li>
  <li>Final knowledge transfer and transition to ongoing support</li>
</ul>

<p><strong>3.3 Training and Support</strong></p>
<p>Comprehensive training program including:</p>
<ul>
  <li>Role-based training curricula for all user types</li>
  <li>Multiple training modalities: classroom, e-learning, simulation, video tutorials</li>
  <li>Super-user program with advanced training for departmental champions</li>
  <li>At-the-elbow support during go-live periods</li>
  <li>24/7 help desk support during implementation</li>
  <li>Ongoing education and optimization sessions</li>
  <li>Annual refresher training and new user onboarding</li>
</ul>

<h2>4. INVESTMENT AND ROI</h2>
<p><strong>4.1 Cost Breakdown</strong></p>

<p><strong>Software Licensing (3 years):</strong> $3,200,000</p>
<ul>
  <li>Epic EHR licenses for 450 concurrent users</li>
  <li>Analytics platform licenses</li>
  <li>AI/ML tool subscriptions</li>
  <li>Cybersecurity software</li>
</ul>

<p><strong>Implementation Services:</strong> $2,800,000</p>
<ul>
  <li>Project management and governance</li>
  <li>System configuration and build</li>
  <li>Workflow analysis and redesign</li>
  <li>Data migration services</li>
  <li>Integration development</li>
  <li>Testing and quality assurance</li>
</ul>

<p><strong>Infrastructure:</strong> $1,450,000</p>
<ul>
  <li>Cloud infrastructure (3-year commitment)</li>
  <li>Network upgrades and wireless expansion</li>
  <li>End-user devices (workstations, tablets, mobile devices)</li>
  <li>Backup and disaster recovery systems</li>
</ul>

<p><strong>Training and Change Management:</strong> $950,000</p>
<ul>
  <li>Training program development</li>
  <li>Instructor-led training delivery</li>
  <li>E-learning platform and content</li>
  <li>Change management consulting</li>
  <li>Communication and engagement programs</li>
</ul>

<p><strong>Ongoing Support (Year 1):</strong> $350,000</p>
<ul>
  <li>Help desk and technical support</li>
  <li>System monitoring and maintenance</li>
  <li>Optimization services</li>
  <li>Security updates and patches</li>
</ul>

<p><strong>Total Investment:</strong> $8,750,000</p>

<p><strong>4.2 Return on Investment</strong></p>
<p>Projected five-year financial benefits:</p>

<p><strong>Revenue Enhancement:</strong> $12,400,000</p>
<ul>
  <li>Improved coding accuracy and charge capture: $4,200,000</li>
  <li>Reduced claim denials and faster reimbursement: $3,100,000</li>
  <li>Increased patient volume through improved access and satisfaction: $3,800,000</li>
  <li>Value-based care incentive payments: $1,300,000</li>
</ul>

<p><strong>Cost Reduction:</strong> $11,700,000</p>
<ul>
  <li>Administrative efficiency gains: $4,500,000</li>
  <li>Reduced medical errors and adverse events: $2,800,000</li>
  <li>Decreased readmissions: $2,100,000</li>
  <li>Supply chain optimization: $1,400,000</li>
  <li>Reduced IT maintenance costs for legacy systems: $900,000</li>
</ul>

<p><strong>Total Five-Year Benefit:</strong> $24,100,000<br>
<strong>Net ROI:</strong> 185% over five years<br>
<strong>Payback Period:</strong> 2.8 years</p>

<h2>5. WHY TECHCORP SOLUTIONS</h2>
<p><strong>5.1 Our Experience</strong></p>
<p>TechCorp Solutions brings unparalleled expertise in healthcare IT transformation:</p>
<ul>
  <li>Over 200 successful healthcare IT implementations across 15 states</li>
  <li>Specialized healthcare IT division with 150+ certified consultants</li>
  <li>Epic Gold Stars Partner status with 50+ Epic-certified staff</li>
  <li>Average client satisfaction score of 4.7/5.0</li>
  <li>98% on-time, on-budget project delivery rate</li>
  <li>Recognized by KLAS Research as a top-tier healthcare IT consulting firm</li>
</ul>

<p><strong>5.2 Our Team</strong></p>
<p>Your dedicated project team will include:</p>
<ul>
  <li><strong>Executive Sponsor:</strong> Sarah Johnson, VP of Healthcare Solutions - 20 years healthcare IT experience</li>
  <li><strong>Project Director:</strong> Michael Chen, PMP, CPHIMS - Led 30+ Epic implementations</li>
  <li><strong>Clinical Lead:</strong> Dr. Emily Rodriguez, MD, CMIO - Practicing physician and clinical informaticist</li>
  <li><strong>Technical Architect:</strong> James Williams, CISSP - Expert in healthcare system integration</li>
  <li><strong>Training Director:</strong> Lisa Martinez, MEd - Specialized in adult learning and change management</li>
</ul>

<p><strong>5.3 Our Commitment</strong></p>
<p>We stand behind our work with:</p>
<ul>
  <li>Fixed-price contract with no hidden fees</li>
  <li>Performance guarantees tied to key milestones</li>
  <li>Dedicated project team for the duration of implementation</li>
  <li>24/7 support during go-live periods</li>
  <li>Ongoing optimization services included for first year</li>
  <li>Knowledge transfer ensuring your team can maintain and enhance the system</li>
</ul>

<h2>6. NEXT STEPS</h2>
<p>We are excited about the opportunity to partner with MidState Healthcare Alliance on this transformative initiative. To move forward, we propose the following next steps:</p>

<ol>
  <li><strong>Proposal Review Meeting</strong> (Week of December 16): Detailed walkthrough of proposal with Q&A</li>
  <li><strong>Reference Calls</strong> (December 16-20): Conversations with similar organizations we've served</li>
  <li><strong>Site Visit</strong> (January 6-7): Visit to a comparable Epic implementation we completed</li>
  <li><strong>Contract Negotiation</strong> (January 13-24): Finalize terms and conditions</li>
  <li><strong>Project Kickoff</strong> (February 3): Official project launch</li>
</ol>

<h2>CONCLUSION</h2>
<p>The digital transformation of MidState Healthcare Alliance represents a strategic investment in the future of healthcare delivery in your region. Our proposed solution will provide the clinical, operational, and analytical capabilities needed to excel in an increasingly complex and competitive healthcare environment.</p>

<p>TechCorp Solutions is committed to being your trusted partner throughout this journey and beyond. We bring not just technical expertise, but a deep understanding of healthcare operations, clinical workflows, and the change management required for successful transformation.</p>

<p>We look forward to the opportunity to discuss this proposal in detail and to demonstrate how our solution will help MidState Healthcare Alliance achieve its strategic objectives while delivering exceptional care to the communities you serve.</p>

<p><strong>Contact Information:</strong><br>
Sarah Johnson, VP Healthcare Solutions<br>
TechCorp Solutions Inc.<br>
Email: sarah.johnson@techcorpsolutions.com<br>
Phone: (555) 123-4567<br>
Direct: (555) 123-4568</p>`,
    samplePrompts: [
      {
        text: "Enhance the business value proposition",
        description: "Agents work on: executive summary, ROI section, and benefits simultaneously"
      },
      {
        text: "Verify all numbers and financial projections",
        description: "Multiple agents check different financial sections in parallel"
      },
// ... existing code ...
      {
        text: "Improve professional tone and persuasiveness",
        description: "Agents refine: introduction, solution description, and conclusion concurrently"
      }
    ]
  },

  "influencer-agreement": {
    title: "Influencer Agreement",
    icon: "bi-camera-video",
    description: "Brand collaboration terms and content deliverables",
    document: `<h1 style="text-align: center;">INFLUENCER MARKETING AGREEMENT</h1>
<p style="text-align: center;"><strong>This Influencer Marketing Agreement</strong> (the "Agreement") is entered into on [Date] (the "Effective Date"), by and between:</p>
<p style="text-align: center;"><strong>GlobalBrands Inc.</strong> ("Company")<br>and<br><strong>[Influencer Name]</strong> ("Influencer")</p>

<h2>1. ENGAGEMENT AND DELIVERABLES</h2>
<p>Company hereby engages Influencer to create and post content promoting Company's summer product line. Influencer agrees to produce the following specific deliverables ("Deliverables"):</p>
<ul>
  <li><strong>Instagram Reels (x2):</strong> Two high-quality video reels (15-30 seconds) demonstrating product usage in a lifestyle setting. Must include caption with campaign tags #SummerVibes and @GlobalBrands.</li>
  <li><strong>YouTube Integration (x1):</strong> One dedicated 60-90 second integration within a regular scheduled vlog, including verbal mention of key product benefits and a link in the description.</li>
  <li><strong>TikTok Series (x3):</strong> Three creative TikTok videos participating in the #GlobalChallenge trend.</li>
  <li><strong>Instagram Stories (x5):</strong> Five story frames with "Swipe Up" link to product page.</li>
</ul>

<h2>2. CAMPAIGN SCHEDULE</h2>
<p>The campaign shall run from June 1, 2024, to August 31, 2024. Deliverables shall be posted according to the following schedule:</p>
<ul>
  <li><strong>Draft Submission:</strong> All content drafts must be submitted for approval by May 15, 2024.</li>
  <li><strong>Posting Dates:</strong> 
    <ul>
      <li>Instagram Reel 1: June 5</li>
      <li>YouTube Integration: June 15</li>
      <li>TikTok Series: July 1, July 15, August 1</li>
    </ul>
  </li>
</ul>

<h2>3. COMPENSATION AND PAYMENT</h2>
<p><strong>3.1 Flat Fee.</strong> In full consideration for the Services and Rights granted herein, Company shall pay Influencer a total flat fee of <strong>$5,000.00 USD</strong>.</p>
<p><strong>3.2 Payment Terms.</strong> Payment shall be made in two installments: 50% upon contract signing and 50% within 14 days of the final deliverable posting.</p>

<h2>4. INTELLECTUAL PROPERTY AND USAGE RIGHTS</h2>
<p><strong>4.1 Ownership.</strong> Influencer retains ownership of all content created. However, Influencer grants Company a worldwide, irrevocable, royalty-free license to use, reproduce, and display the content for digital marketing purposes.</p>
<p><strong>4.2 Paid Media.</strong> Company shall have the right to whitelist and promote the content via paid social media ads for a period of six (6) months from the posting date.</p>

<h2>5. EXCLUSIVITY</h2>
<p>Influencer agrees that during the Term of this Agreement and for a period of thirty (30) days following the final post, they will not create sponsored content for any direct competitors in the [Industry/Category] space. Direct competitors include but are not limited to: [Competitor A], [Competitor B].</p>

<h2>6. FTC COMPLIANCE</h2>
<p>Influencer represents and warrants that all posts will clearly and conspicuously disclose the material connection between Company and Influencer in compliance with Federal Trade Commission (FTC) guidelines (e.g., using #ad, #sponsored).</p>`,
    samplePrompts: [
      { text: "Tighten exclusivity terms", description: "Agents review usage rights and competition clauses" },
      { text: "Clarify deliverables", description: "Agents expand on video requirements" }
    ]
  },

  "service-level-agreement": {
    title: "Service Level Agreement",
    icon: "bi-server",
    description: "SLA for Enterprise SaaS definition",
    document: `<h1 style="text-align: center;">ENTERPRISE SERVICE LEVEL AGREEMENT</h1>
<p><strong>Effective Date:</strong> January 1, 2025</p>
<p>This Service Level Agreement ("SLA") is an integral part of the Master Subscription Agreement between <strong>CloudTech Systems</strong> ("Provider") and <strong>Enterprise Corp</strong> ("Customer").</p>

<h2>1. DEFINITIONS</h2>
<ul>
  <li><strong>"Uptime"</strong> means the percentage of time the Service is available and accessible to the Customer, excluding Scheduled Maintenance.</li>
  <li><strong>"Scheduled Maintenance"</strong> means planned downtime for updates, with at least 48 hours prior notice.</li>
  <li><strong>"Downtime"</strong> means any period greater than one minute where the Service is unavailable due to Provider's systems.</li>
</ul>

<h2>2. SERVICE AVAILABILITY COMMITMENT</h2>
<p>Provider guarantees a Monthly Uptime Percentage of <strong>99.99%</strong> ("Service Level Objective"). Availability is calculated as follows:</p>
<p><em>(Total Minutes in Month - Downtime Minutes) / Total Minutes in Month * 100</em></p>

<h2>3. SUPPORT RESPONSE TIMES</h2>
<p>Provider shall respond to support requests within the following timeframes based on severity:</p>
<div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
  <p><strong>🔴 Priority 1 (Critical):</strong> Complete system outage or data loss.<br>
  <em>Response Time:</em> Within 15 minutes (24/7)</p>
  
  <p><strong>🟠 Priority 2 (High):</strong> Major feature failure, heavy performance degradation.<br>
  <em>Response Time:</em> Within 2 hours (Business Hours)</p>
  
  <p><strong>🔵 Priority 3 (Normal):</strong> Minor bug or question.<br>
  <em>Response Time:</em> Within 1 business day</p>
</div>

<h2>4. SERVICE CREDITS</h2>
<p>In the event Provider fails to meet the Service Level Objective, Customer shall be entitled to Service Credits as follows:</p>
<ul>
  <li><strong>Uptime 99.90% - 99.98%:</strong> 5% of Monthly Fee credited</li>
  <li><strong>Uptime 99.50% - 99.89%:</strong> 10% of Monthly Fee credited</li>
  <li><strong>Uptime 99.00% - 99.49%:</strong> 25% of Monthly Fee credited</li>
  <li><strong>Uptime below 99.00%:</strong> 50% of Monthly Fee credited</li>
</ul>
<p>Service Claims must be submitted within thirty (30) days of the variance.</p>`,
    samplePrompts: [
      { text: "Make penalties stricter", description: "Agents adjust service credits and response times" },
      { text: "Standardize definitions", description: "Agents review availability and priority definitions" }
    ]
  },

  "crisis-response-plan": {
    title: "Crisis Response Plan",
    icon: "bi-shield-exclamation",
    description: "Emergency protocols and communication strategy",
    document: `<h1 style="text-align: center; color: #d9534f;">CORPORATE CRISIS RESPONSE PROTOCOL</h1>
<p><strong>Version:</strong> 2.0 | <strong>Last Updated:</strong> October 2024</p>
<p><strong>Purpose:</strong> To establish a clear chain of command and communication strategy in the event of a significant business disruption or reputation threat.</p>

<h2>1. CRISIS LEVELS AND ACTIVATION</h2>
<p>This plan is activated upon declaration of one of the following severity levels:</p>
<ul>
  <li><strong>Level 1 (Critical):</strong> Immediate threat to life, safety, or core business continuity (e.g., Major Data Breach, Natural Disaster, Executive Scandal).</li>
  <li><strong>Level 2 (High):</strong> Significant operational disruption or growing negative media coverage.</li>
  <li><strong>Level 3 (Medium):</strong> Localized issue with potential to escalate.</li>
</ul>

<h2>2. CRISIS RESPONSE TEAM (CRT)</h2>
<p>The CRT must convene within 60 minutes of a Level 1 activation.</p>
<ul>
  <li><strong>Incident Commander:</strong> Chief Executive Officer (Executes final decisions)</li>
  <li><strong>Legal Advisor:</strong> General Counsel (Mitigates liability)</li>
  <li><strong>Communications Lead:</strong> VP of Public Relations (Manages internal/external messaging)</li>
  <li><strong>HR Lead:</strong> Chief People Officer (Employee safety and communications)</li>
</ul>

<h2>3. IMMEDIATE ACTION PLAN (First 0-4 Hours)</h2>
<p><strong>Hour 0-1: Assessment & Containment</strong></p>
<ul>
  <li>Secure all affected systems (IT Security Lead).</li>
  <li>Ensure physical safety of all employees (Facilities Director).</li>
  <li>CRT convenes for initial briefing.</li>
</ul>

<p><strong>Hour 1-2: Notification</strong></p>
<ul>
  <li>Notify Board of Directors.</li>
  <li>Contact cyber insurance/legal defense counsel.</li>
  <li>Issue "Holding Statement" to media (if inquiry received).</li>
</ul>

<h2>4. COMMUNICATION TEMPLATES</h2>
<p><strong>Internal Holding Statement:</strong></p>
<p><em>"We are aware of the situation regarding [Incident]. The Crisis Response Team has been activated and is investigating. We will share verified facts as soon as they are available. Please direct all media inquiries to [Contact]."</em></p>

<h2>5. POST-INCIDENT REVIEW</h2>
<p>Within 48 hours of crisis de-escalation, a thorough "After-Action Report" will be generated to document lessons learned and update protocols.</p>`,
    samplePrompts: [
      { text: "Expand communication protocols", description: "Agents detail stakeholder notification steps" },
      { text: "Review roles and responsibilities", description: "Agents clarify team accountabilities" }
    ]
  }
};

// Agent configurations for multi-agent parallelism
export const agentConfigurations = {
  "legal-contract": [
    {
      id: "agent-parties",
      name: "Parties Verifier",
      color: "#FF6B6B",
      section: "PARTIES",
      task: "Verify all party names, addresses, and legal entity information for accuracy and completeness"
    },
    {
      id: "agent-liability",
      name: "Liability Checker",
      color: "#4ECDC4",
      section: "LIABILITY",
      task: "Review limitation of liability clauses, indemnification provisions, and ensure adequate protection"
    },
    {
      id: "agent-ip",
      name: "IP Rights Analyst",
      color: "#95E1D3",
      section: "INTELLECTUAL PROPERTY",
      task: "Analyze intellectual property provisions, ownership rights, and licensing terms"
    }
  ],
  "research-paper": [
    {
      id: "agent-abstract",
      name: "Abstract Enhancer",
      color: "#A8E6CF",
      section: "Abstract",
      task: "Improve abstract clarity, ensure it accurately summarizes key findings and methodology"
    },
    {
      id: "agent-methodology",
      name: "Methods Reviewer",
      color: "#FFD3B6",
      section: "Methodology",
      task: "Enhance technical descriptions, verify methodological rigor and reproducibility"
    },
    {
      id: "agent-results",
      name: "Results Analyzer",
      color: "#FFAAA5",
      section: "Results",
      task: "Verify data presentation, statistical accuracy, and clarity of findings"
    },
    {
      id: "agent-references",
      name: "Citation Checker",
      color: "#FF8B94",
      section: "References",
      task: "Verify citation accuracy, formatting consistency, and completeness"
    }
  ],
  "business-proposal": [
    {
      id: "agent-executive",
      name: "Executive Summary",
      color: "#B4A7D6",
      section: "EXECUTIVE SUMMARY",
      task: "Enhance value proposition, ensure compelling presentation of key benefits"
    },
    {
      id: "agent-financial",
      name: "Financial Analyst",
      color: "#9FA8DA",
      section: "INVESTMENT AND ROI",
      task: "Verify all financial calculations, projections, and ensure accuracy of numbers"
    },
    {
      id: "agent-technical",
      name: "Technical Writer",
      color: "#80CBC4",
      section: "PROPOSED SOLUTION",
      task: "Improve technical descriptions, ensure clarity and completeness of solution architecture"
    }
  ],
  "influencer-agreement": [
    { id: "agent-deliverables", name: "Content Strategist", color: "#FF6B6B", section: "DELIVERABLES", task: "Review scope" },
    { id: "agent-legal", name: "Legal", color: "#4ECDC4", section: "USAGE RIGHTS", task: "Check rights" }
  ],
  "service-level-agreement": [
    { id: "agent-uptime", name: "SRE Lead", color: "#A8E6CF", section: "SERVICE AVAILABILITY", task: "Check uptime" },
    { id: "agent-credits", name: "Billing", color: "#FFD3B6", section: "SERVICE CREDITS", task: "Verify credits" }
  ],
  "crisis-response-plan": [
    { id: "agent-comms", name: "PR Director", color: "#FFAAA5", section: "IMMEDIATE ACTIONS", task: "Review comms" },
    { id: "agent-ops", name: "Ops Lead", color: "#B4A7D6", section: "CORE RESPONSE TEAM", task: "Check roles" }
  ]
};
