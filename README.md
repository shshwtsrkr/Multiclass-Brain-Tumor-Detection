# Intel oneAPI ML Hackathon
![oneAPI banner](https://www.intel.com/content/dam/develop/public/us/en/images/thumbnails/tool-thumbnail-beta-oneapi-logo.jpg)
* oneAPI is an open, cross-architecture programming model that frees developers to use a single code base across multiple architectures. The result is accelerated compute without vendor lock-in.
* The objective of this hackathon is to build solutions with oneAPI for compelling problems identified. Developers can choose to work in the themes of the ML, Computer Vision, and Open Innovation theme. The developers are expected to build the solutions using the Intel® oneAPI AI Analytics Toolkits.
* The project submission must be open-source and use open-source technologies such as Scikit and Intel oneAPI; otherwise, it will not be accepted. This requirement is necessary as the project needs to be tested and evaluated during judging.
## Problem Statement
**Medical Image Analysis:** Develop computer vision projects using Scikit-Learn's image processing capabilities to analyze medical images, such as X-rays or MRI scans. This could include building models to identify patterns or anomalies that could indicate the presence of a disease or condition.

## Intel DevCloud for oneAPI
Intel provides with Cloud Services with [DevCloud](https://devcloud.intel.com/oneapi/) to learn about oneAPI.
It provides complete code samples and training modules you can access for free for 3 months. 
## Intel oneAPI Toolkits
[Intel oneAPI Toolkit](https://www.intel.com/content/www/us/en/developer/tools/oneapi/toolkits.html).
The main criteria of this hackathon is that we would **have** to use atleast one toolkit or atleast a part of it. For example one can use, Intel-optimized python, Intel-optimized Scikit-Lab.
### Explore Intel oneAPI Toolkits in the DevCloud
**Intel® oneAPI AI Analytics Toolkit** from [here](https://devcloud.intel.com/oneapi/get_started/)
- Intel Optimization for TensorFlow
- Intel Optimization for Python

## References
[oneAPI sample codes](https://github.com/oneapi-src/oneAPI-samples)
[oneAPI SRC codes](https://github.com/oneapi-src)
[oneAPI example](https://github.com/topics/oneapi)

### Documentation

[Intel OneAPI](https://www.intel.com/content/www/us/en/developer/tools/oneapi/overview.html)
[Specialized toolkits](https://www.intel.com/content/www/us/en/developer/tools/oneapi/toolkits.html)
[Environment for Intel DevCloud](https://devcloud.intel.com/oneapi/)

## Submission Criteria
* All the running codes should be uploaded in Github and the open/public link to be shared.
* Instruction to run the application, readme file (if any)
* Youtube Video / Medium blog describing the project.
* Images / Snapshot and videos to be included.

# [Medium Blog](https://medium.com/@arnabroy02/brain-tumor-classification-using-resnet50-3f8648958799) Describing the project
We've have written a medium blog describing the project.  
Giving a brief introduction, background, dataset, neural architecture,  
How we trained the model and the Results we achieved.
You can feel free to read the medium blog [here](https://medium.com/@arnabroy02/brain-tumor-classification-using-resnet50-3f8648958799) :) 

# [Jupyter Notebook](brain_tumor_detection.ipynb)
The Jupyter notebook that contains the code used to train the model can be viewed [here](brain_tumor_detection.ipynb).

# Instructions to run the the code
1. Git clone the repo
``` yaml
git clone https://github.com/shshwtsrkr/Multiclass-Brain-Tumor-Detection
```
2. Install all dependencies for angular
```yaml
npm install
```
3. To serve the project on localhsot
```yaml 
ng serve
```
OR to serve and open the frontend application in the default browser
```yaml
ng serve --open
```
3. Install all python dependencies for the flask server working the backend
```yaml
pip install -r requirements.txt
```
4. Finally run the flask server which would then connect the frontend application and use the model file to accurately determine the type of tumor(Glioma, Meningioma and Pituitary) or No tumour.
```yaml
flask run
```

# Demonstration of the project
A live demo of the project can be seen [here](https://drive.google.com/file/d/1gWG_HQkUjpnSZS-H_UEMlfTLc5HfdIeT/view?usp=sharing)

## License

Our project is distributed under the MIT License. [MIT](LICENSE)

# Checklist
- [x] Learning about oneAPI resources
- [x] Learning about oneAPI DevCloud
- [x] Satisfactory work done on AI/ML portion of Problem Statement 
- [x] FrontEnd Development
- [x] Integrating and forming a fully-functional AI/ML solution Application
- [x] Deploying the application on oneAPI DevCloud
- [x] Prepare proper Documentation with clear and concise instructions to run the application
- [x] Preparing a Youtube Video/Medium blog describing the project.
- [x] Evaluate the project and then Submission
