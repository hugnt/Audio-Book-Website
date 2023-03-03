<?php
require_once ("database.php");
class m_tacgia extends database
{
    public function read_ban()
    {
        $sql = "SELECT * FROM tac_gia";
        $this->setQuery($sql);
        return $this->loadAllRows();
    }
}
$m_tacgia=new m_tacgia();
$tacgia=$m_tacgia->read_ban();
print_r($tacgia);