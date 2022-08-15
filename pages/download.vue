<template>
    <div>
        <v-btn @click="download">
            download
        </v-btn>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, query, collection, orderBy, getDocs } from "firebase/firestore";
import JSZip from "jszip";

export default defineComponent({
    components: {},
    setup() {
        const download = async () => {
            const storage = getStorage();
            const db = getFirestore();

            const querySnapshot = await getDocs(query(collection(db, 'img'), orderBy('created', 'desc')));
            const imagePromises = querySnapshot.docs.map((doc) => new Promise((resolve) => {
                getDownloadURL(ref(storage, `gs://test2-c116e.appspot.com/images/${encodeURIComponent(doc.data().fileName)}`))
                    .then((url) => {
                        const xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        xhr.open('GET', url);
                        xhr.send();
                        xhr.onload = () => {
                            resolve({
                                name: doc.data().fileName,
                                data: xhr.response
                            });
                        };
                    });
            }));
            const images = await Promise.all(imagePromises);

            const zip = new JSZip();
            const folderName = "test";
            const folder = zip.folder(folderName);
            images.forEach((image) => {
                folder.file(image.name, image.data);
            });
            zip.generateAsync({ type: "blob" }).then((blob) => {
                const dlLink = document.createElement("a");
                const dataUrl = URL.createObjectURL(blob);
                dlLink.href = dataUrl;
                dlLink.download = `${folderName}.zip`;

                document.body.insertAdjacentElement("beforeEnd", dlLink);
                dlLink.click();
                dlLink.remove();

                setTimeout(function() {
                    URL.revokeObjectURL(dataUrl);
                }, 1000);
            });
        };

        return {
            download
        }
    },
})
</script>
