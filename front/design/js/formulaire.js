'use strict';
(function () {

    //Initialisation du module AngularJS et du module xeditable.
    var app = angular.module('EmprunteurA', ["xeditable"]);

    //Controleur principal de l'app AngularJS
    app.controller('emprunteurCtrl', function ($scope, $http) {
      // Déclaration de l'URL du Serveur REST
      var url = 'http://localhost/api_rest-master/back/emprunteur';

      //Méthode GET -> Récupérer et afficher les données
      $scope.Initialisation = function(){
        $http.get(url)
                .success(function(resultat) {
                  $scope.emprunteur = resultat;
                });
     };
      $scope.Initialisation();
       
      //Méthode DELETE -> Suppression d'un élement
        $scope.removeEmp = function(index){
          if(window.confirm('Voulez vous supprimer cette emprunteur ?')){
            $scope.emprunteur.splice(index, 1);
            var urlDel = url + '/' + this.emp.idemprunteur;
            $http.delete(urlDel);
          }
          };
        

      //Méthode POST -> Ajouter un élement dans la base
        $scope.addEmp = function () {
         $scope.emprunteur.push({
              nom: this.emp.nom,
              prenom: this.emp.prenom

          });
          $http.post(url,{
            nom: this.emp.nom,
            prenom: this.emp.prenom
          });
          $scope.emp =[];
          setTimeout($scope.Initialisation,500);
      };
    //Méthode PUT -> MàJ d'un élément
      $scope.updateEmp = function () {
          var urlUpd = url + '/' + this.emp.idemprunteur;
          $http.put(urlUpd,{
            nom: this.emp.nom,
            prenom: this.emp.prenom
          });
        };
    //Supprimer les élements cochés
        $scope.DeleteAll= function(index){
        if(window.confirm('Voulez vous supprimer tout les emprunteurs ?')){
          for(var i=0; i<$scope.emprunteur.length;i++){
            var urlDel = url + '/' + $scope.emprunteur[i].idemprunteur;
            $http.delete(urlDel);
            $scope.emprunteur.splice(index, 1);
            i--;
          }
        }
};

    });
})();
